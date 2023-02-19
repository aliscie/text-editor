export function parseFormulasFromTable(table) {
    const table_element = document.getElementById(table);
    table_element.querySelectorAll(".formula").forEach((element) => {

        element.addEventListener("keyup", (event) => {
            console.log(element.innerText)
            element.setAttribute("formula", element.innerText);
            // element.setAttribute("inner-text", element.innerText);
        });

        element.addEventListener("focus", (event) => {
            const formula = element.attributes["formula"].value;
            element.setAttribute("inner-text", element.innerText);
            element.innerHTML = formula
        });

        element.addEventListener("blur", (event) => {
            let formula = element.attributes["formula"].value;
            // if (formula[0] == "=") {
            //     formula.replace("=","")
            // }
            const res = eval(formula)
            // const text = element.attributes["inner-text"].value
            element.innerHTML = res
        });

    });

    return "formulas";
}
