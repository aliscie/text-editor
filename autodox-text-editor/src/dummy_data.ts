const my_dummies = [
    {tag: 'h3', children: [{content: "hello world"}]},
    {
        tag: 'p',
        // condition: "if user age >= 18"
        children: [{content: "loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."}]
    },
    {
        tag: 'quote',
        children: [{content: "Hello quote"}]
    },
    {
        tag: 'p',
        children: [
            {content: "small text", children: [{content: "nested child", tag: "b"}]},
            {content: "  more text"}
        ]
    },
];
export default my_dummies;