// QuLang documentation: search box and summary-table filters.
// Each page sets data-root on <body> ("" or "../") so links work from any folder.

const PAGES = [
    { title: "Overview", kind: "page", url: "index.html" },
    { title: "Language", kind: "section", url: "language/index.html" },
    { title: "rule", kind: "keyword", url: "language/rule.html" },
    { title: "Catalogue", kind: "section", url: "catalogue/index.html" },
    { title: "Errors", kind: "section", url: "errors/index.html" },
    { title: "Commands", kind: "section", url: "commands/index.html" },
    { title: "qu check", kind: "command", url: "commands/index.html#check" },
    { title: "qu diff", kind: "command", url: "commands/index.html#diff" },
    { title: "Index", kind: "page", url: "index-all.html" },
    { title: "Help", kind: "page", url: "help.html" },
];

const MAX_RESULTS = 8;

function setUpSearch() {
    const input = document.getElementById("search-input");
    const list = document.getElementById("search-results");
    if (!input || !list) return;

    const root = document.body.dataset.root || "";
    let selected = -1;

    function render() {
        const query = input.value.trim().toLowerCase();
        list.innerHTML = "";
        selected = -1;
        if (!query) {
            list.hidden = true;
            return;
        }
        const matches = PAGES.filter((p) => p.title.toLowerCase().includes(query)).slice(0, MAX_RESULTS);
        if (matches.length === 0) {
            const li = document.createElement("li");
            li.className = "none";
            li.textContent = "No results";
            list.appendChild(li);
        }
        for (const page of matches) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = root + page.url;
            const title = document.createElement("span");
            title.textContent = page.title;
            const kind = document.createElement("span");
            kind.className = "kind kind-" + page.kind;
            kind.textContent = page.kind[0].toUpperCase() + page.kind.slice(1);
            a.append(title, kind);
            li.appendChild(a);
            list.appendChild(li);
        }
        list.hidden = false;
    }

    function move(step) {
        const items = [...list.querySelectorAll("li:not(.none)")];
        if (items.length === 0) return;
        selected = (selected + step + items.length) % items.length;
        items.forEach((li, i) => li.classList.toggle("selected", i === selected));
    }

    input.addEventListener("input", render);
    input.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
        else if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
        else if (event.key === "Escape") { input.value = ""; render(); }
        else if (event.key === "Enter") {
            const links = list.querySelectorAll("li:not(.none) a");
            const target = links[Math.max(selected, 0)];
            if (target) window.location.href = target.href;
        }
    });
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".search")) list.hidden = true;
    });
}

// Filter buttons above a summary table show only the rows whose data-group matches.
function setUpFilters() {
    for (const group of document.querySelectorAll(".segmented[data-table]")) {
        const table = document.getElementById(group.dataset.table);
        if (!table) continue;
        const buttons = group.querySelectorAll("button");
        for (const button of buttons) {
            button.addEventListener("click", () => {
                buttons.forEach((b) => b.setAttribute("aria-selected", String(b === button)));
                const filter = button.dataset.filter;
                for (const row of table.tBodies[0].rows) {
                    row.hidden = filter !== "all" && row.dataset.group !== filter;
                }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setUpSearch();
    setUpFilters();
});
