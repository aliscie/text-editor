const my_dummies = [
    {tag: 'h3', children: [{id: "p2", content: "hello world"}], id: "p3",},
    {
        tag: 'p',
        // condition: "if user age >= 18"
        children: [{
            id: "random_id_4",
            content: "loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        }],
        id: "random_id_2",
    },
    {
        tag: 'quote',
        children: [{id: "quote_id", content: "Hello quote"},],
        id: "p_id_3",
    },

    {
        tag: 'p',
        id: "p_id_4",
        children: [
            {id: "random_id_3", content: "small text", children: [{type: "leaf", content: "nested child", tag: "b"}]},
            {content: "  more text"}
        ],

    },
];


export default my_dummies;