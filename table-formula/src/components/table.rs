use std::rc::Rc;
use wasm_bindgen::JsCast;
use wasm_bindgen::prelude::*;
use yew::prelude::*;
pub use crate::helpers::*;
use log::info;
use yew::virtual_dom::VNode;

#[derive(Properties, PartialEq)]
pub struct TableProps {
    pub children: Children,
    pub id: String,
}

#[function_component]
pub fn Table(props: &TableProps) -> Html {
    return html! {
        <table id={props.id.clone()}>
        {
            props.children.clone().into_iter().map(|row| {
                let row : yew::virtual_dom::VNode =  row.clone();
                    info!("Hello {:#?}", row);
                    // TODO iterate through cells
                    // if let VNode::VTag(list) = row.clone() {
                    //     info!("Hello {:#?}", list.clone().children);
                    // //     list.clone().children.into_iter().map(|cell| {
                    // //     {cell}
                    // // }).collect::<Html>()
                    // } else {
                    //     // html!{""}
                    // info!("Hello {:#?}","list");
                    // };
                {row.clone()}
            }).collect::<Html>()
        }

        </table>
    };
}
