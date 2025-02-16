export default function RenderElement({ attributes, children, element }) {
  switch (element.type) {
    case "heading":
      return <h2 {...attributes} className="renderElementXlBold">{children}</h2>
  }
}