// use scraper::{Html, Selector};
//
// fn extract_value_by_column_and_row(html: &str, column_name: &str, row_index: usize) -> Option<String> {
//     let document = Html::parse_document(html);
//     let header_selector = Selector::parse("thead tr th").unwrap();
//     let column_index = document
//         .select(&header_selector)
//         .position(|header| header.text().next().unwrap_or("") == column_name)?;
//     let row_selector = Selector::parse("tbody tr").unwrap();
//     let row_element = document.select(&row_selector).nth(row_index)?;
//
//     let value_selector = Selector::parse("td").unwrap();
//     let value_element = row_element.select(&value_selector).nth(column_index)?;
//
//     Some(value_element.text().collect::<String>())
// }
//
//
// use wasm_bindgen::JsCast;
// use web_sys::{HtmlTableCellElement, HtmlTableRowElement, Window};
// use js_sys::Object;
//
// fn get_row_index(cell: &HtmlTableCellElement) -> Option<usize> {
//     // Get the parent row element of the cell
//     let row_element = cell.parent_element()?.dyn_into::<HtmlTableRowElement>().ok()?;
//
//     // Get the parent table element of the row
//     let table_element = row_element.parent_element()?.dyn_into::<HtmlTableElement>().ok()?;
//
//     // Get the index of the row element within the table
//     let row_index = table_element.rows().get_index_of(&row_element.into()).ok()?;
//
//     Some(row_index)
// }
