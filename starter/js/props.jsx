// Your Name, student number
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// Worked example: props is ONE object; the parameter pattern takes it apart.
// These two components are the same thing written two ways.
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// P2
console.log('P2 nested:', renderToStaticMarkup(<CardB title="Updates">Brew</CardB>))
console.log('P2 explicit:', renderToStaticMarkup(<CardB title="Updates" children="Brew" />))

// P3
const childSamples = {
  string: 'Brew',
  number: 2,
  element: <strong>Brew</strong>,
  elements: [<strong key="brew">Brew</strong>, <em key="app-store">App Store</em>],
  undefined: undefined,
  null: null,
  false: false
}

for (const [label, children] of Object.entries(childSamples)) {
  console.log(`P3 ${label}:`, renderToStaticMarkup(<CardB title="Child">{children}</CardB>))
}

const renderBrew = () => <strong>Brew</strong>
console.log('P3 function direct:', renderToStaticMarkup(<CardB title="Child">{renderBrew}</CardB>))

function RenderChild({ children }) {
  return <CardB title="Child">{children()}</CardB>
}
console.log('P3 function called:', renderToStaticMarkup(<RenderChild>{renderBrew}</RenderChild>))

// P4
function ForwardedCard({ title, children, ...rest }) {
  return (
    <>
      <section {...rest} className="task-card"><h2>{title}</h2>{children}</section>
      <section className="task-card" {...rest}><h2>{title}</h2>{children}</section>
    </>
  )
}
console.log('P4:', renderToStaticMarkup(
  <ForwardedCard title="Updates" className="highlight" aria-label="Update task">Brew</ForwardedCard>
))

// P5
function SlotPanel({ header, footer, children }) {
  return <article><header>{header}</header><div>{children}</div><footer>{footer}</footer></article>
}

function ChildrenPanel({ children }) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(
  <SlotPanel header="Updates" footer="Two tasks">Brew</SlotPanel>
))
console.log('P5 children:', renderToStaticMarkup(
  <ChildrenPanel><header>Updates</header><div>Brew</div><footer>Two tasks</footer></ChildrenPanel>
))

// P6
function Banner({ label = 'Updates' }) {
  return <p>{label}</p>
}
console.log('P6 undefined:', renderToStaticMarkup(<Banner label={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Banner label={null} />))

// P7
function TaskButton({ type = 'button', children, ...rest }) {
  return <button type={type} {...rest}>{children}</button>
}
console.log('P7 optional child:', renderToStaticMarkup(<CardB title="Updates" />))
console.log('P7 slots without child:', renderToStaticMarkup(<SlotPanel header="Updates" footer="Two tasks" />))
console.log('P7 button:', renderToStaticMarkup(<TaskButton disabled aria-label="Run updates">Run</TaskButton>))
