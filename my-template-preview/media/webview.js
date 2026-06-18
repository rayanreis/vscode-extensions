(function () {
    "use strict";

    function cssEscape(value) {
        if (window.CSS && typeof CSS.escape === "function") {
            return CSS.escape(value);
        }
        return String(value).replace(/["\\]/g, "\\$&");
    }

    // Copy the resolved template to the clipboard. Each {{name}} is replaced
    // with its input value; blanks keep the original {{name}} marker.
    window.copyTemplate = function (button) {

        const block =
            button.closest(".template-block") || button.parentElement;
        if (!block) {
            return;
        }

        const template = block.getAttribute("data-template") || "";

        const values = {};
        block.querySelectorAll(".ph").forEach(function (input) {
            values[input.dataset.name] = input.value;
        });

        const resolved = template.replace(
            /\{\{(.*?)\}\}/g,
            function (match, rawName) {
                const value = values[rawName.trim()];
                return value === undefined || value === "" ? match : value;
            }
        );

        navigator.clipboard.writeText(resolved).then(function () {
            const original = button.textContent;
            button.textContent = "Copied!";
            setTimeout(function () {
                button.textContent = original;
            }, 1200);
        });
    };

    // Copy button — delegated because inline onclick is blocked by preview CSP.
    document.addEventListener("click", function (event) {
        const button = event.target && event.target.closest
            ? event.target.closest(".template-copy")
            : null;
        if (button) {
            copyTemplate(button);
        }
    });

    // Linked inputs: typing in one placeholder fills every input that shares
    // the same name. Delegated so it survives the preview re-rendering.
    document.addEventListener("input", function (event) {
        const target = event.target;
        if (
            !target ||
            !target.classList ||
            !target.classList.contains("ph")
        ) {
            return;
        }

        const name = target.dataset.name;
        const selector = '.ph[data-name="' + cssEscape(name) + '"]';
        document.querySelectorAll(selector).forEach(function (input) {
            if (input !== target) {
                input.value = target.value;
            }
        });
    });
})();
