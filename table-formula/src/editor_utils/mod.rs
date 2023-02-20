use wasm_bindgen::prelude::*;

pub use extract::*;

mod extract;

#[wasm_bindgen(module = "/src/editor_utils/formula.js")]
extern "C" {
    #[wasm_bindgen(js_name = parseFormulasFromTable)]
    pub fn table_formula(editor: String) -> JsValue;
}