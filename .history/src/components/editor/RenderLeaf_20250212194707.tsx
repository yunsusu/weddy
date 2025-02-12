export default function RenderLeaf({ attributes, children, leaf }) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
}