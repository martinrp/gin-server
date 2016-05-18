import hbs from 'hbs';
import _ from 'underscore';


export default hbs.registerHelper('select', function(items, options) {
  return `<select name="${options.hash.name}">` +
  items.map( (item, i) => {
    let selected = '';
    if (i===0){ selected = 'selected'; }
    return `<option value="${item.username}" ${selected}>${item.username}</option>` 
    }) +
  `</select>`;
});