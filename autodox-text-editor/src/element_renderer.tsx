import React from 'react';
import {Quote} from "./components/quote";

interface Props {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}

function ElementRenderer(props: Props): JSX.Element {
    const {tag, content, attributes = {}, children} = props;
    const Tag = tag || "spam";
    if (tag =="quote") {
        return (
            <Quote/>
        );
    }
    return (
        <Tag {...attributes}>
            {children ? children.map((child: any, childIndex: number) => {
                return <ElementRenderer {...child} />;
            }) : (content ? content : null)}
        </Tag>
    );
}
export default ElementRenderer;
