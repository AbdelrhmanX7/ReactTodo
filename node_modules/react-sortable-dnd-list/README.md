# SortableList

A sortable drag'n'drop list React component.

[DEMO](https://catamphetamine.github.io/react-sortable-dnd-list)

[DEMO](https://codepen.io/catamphetamine/pen/qBWxEQX) (same but on [codepen.io](https://codepen.io))

## Install

```
npm install react-sortable-dnd-list --save
```

## Use

The exported `SortableList` component accepts properties:

* `value` — A list of items. Yes, the property name may seem weird but there's a reason for it: `value`/`onChange` convention is useful for using a sortable list as a form field.
* `onChange: function` — Is called with the new `value` after the user has interacted with the list.
* `component` — List component. Is `"div"` by default.
* `itemComponent` — List item component (see below).
* `itemComponentProps` — If defined, these properties will be passed to each list item element.
* `dragHandleDataAttribute: string?` — If defined then only the handle of a list item will be draggable, not the entire list item. For example, if `dragHandleDataAttribute` is `"draggable"` then somewhere inside list item DOM Element there must be a DOM Element with a `data-draggable` attribute, and only that DOM Element will be draggable.
* `animationDuration: number?` — Is `200` by default.
* `animationEasing: string?` — Is `ease-out` by default.

`itemComponent` receives properties:

* `dragging: boolean` — Is `true` when some item is being dragged.
* `dragged: boolean` — Is `true` when this item is being dragged.
* `style: object` — The `style` property that must be set on the item root element.
* `children` — The list item.

## Example

```js
import React from 'react'
import SortableList from 'react-sortable-dnd-list'

const items = []
let i = 0
while (i < 10) {
  items.push({
    title: `List Item ${i + 1}`,
    description: 'Aenean aliquam molestie urna, vel aliquam.'
  })
  i++
}

function ItemComponent({
  dragging,
  dragged,
  children: { title, description },
  ...rest
}) {
  return (
    <div {...rest} className={`list__item ${dragged ? 'is-dragging' : ''}`}>
      <div className="list__item-content">
        <div className="list__item-title">
          {title}
        </div>
        <div className="list__item-description">
          {description}
        </div>
      </div>
    </div>
  )
}

function Demo({
  initialItems
}) {
  const [items, setItems] = useState(initialItems)
  return (
    <SortableList
      className="list"
      itemComponent={ItemComponent}
      value={items}
      onChange={setItems}/>
  )
}

ReactDOM.render(
  <Demo initialItems={items}/>,
  document.getElementById('app')
)
```

## License

[MIT](LICENSE)