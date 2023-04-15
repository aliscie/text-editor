import { Component, html } from '@odoo/owl';
data = [
  {user:"ali", fields;[{age: "number", "name": "string"}]},
]
class Greeting extends Component {
  let current_user = getuser()
  let user = shee.get(current_user)
  user.map((key, item)=>{
    return renderForm(key, item)
 })


  state = { message: 'Welcome to my app!' };
}

const app = new Greeting({ target: document.body, props: { name: 'Alice' } });

