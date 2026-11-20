// Your Name, student number
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type CardProps = { title: string; children?: ReactNode }

// Worked example: the type goes after the whole pattern, and children is in the type too.
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log(renderToStaticMarkup(<Card title="Hi">text</Card>))
// <section><h2>Hi</h2>text</section>

// P1
function CardFromProps(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
console.log('P1 props object:', renderToStaticMarkup(<CardFromProps title="Hi">text</CardFromProps>))

// P2
console.log('P2 nested:', renderToStaticMarkup(<Card title="Updates">Brew</Card>))
console.log('P2 explicit:', renderToStaticMarkup(<Card title="Updates" children="Brew" />))

// P3
const childSamples: Record<string, ReactNode> = {
  string: 'Brew',
  number: 2,
  element: <strong>Brew</strong>,
  elements: [<strong key="brew">Brew</strong>, <em key="app-store">App Store</em>],
  undefined: undefined,
  null: null,
  false: false
}

for (const [label, children] of Object.entries(childSamples)) {
  console.log(`P3 ${label}:`, renderToStaticMarkup(<Card title="Child">{children}</Card>))
}

function RenderChild({ children }: { children: () => ReactNode }) {
  return <Card title="Child">{children()}</Card>
}

const renderBrew = () => <strong>Brew</strong>
console.log('P3 function called:', renderToStaticMarkup(<RenderChild>{renderBrew}</RenderChild>))

// P4
type ForwardedCardProps = CardProps & ComponentProps<'section'>

function ForwardedCard({ title, children, ...rest }: ForwardedCardProps) {
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
type SlotPanelProps = PropsWithChildren<{ header: ReactNode; footer: ReactNode }>

function SlotPanel({ header, footer, children }: SlotPanelProps) {
  return <article><header>{header}</header><div>{children}</div><footer>{footer}</footer></article>
}

function ChildrenPanel({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
console.log('P5 slots:', renderToStaticMarkup(
  <SlotPanel header="Updates" footer="Two tasks">Brew</SlotPanel>
))
console.log('P5 children:', renderToStaticMarkup(
  <ChildrenPanel><header>Updates</header><div>Brew</div><footer>Two tasks</footer></ChildrenPanel>
))

// P6
function Banner({ label = 'Updates' }: { label?: string | null }) {
  return <p>{label}</p>
}
console.log('P6 undefined:', renderToStaticMarkup(<Banner label={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Banner label={null} />))

// P7
function TaskButton({ type = 'button', children, ...rest }: ComponentProps<'button'>) {
  return <button type={type} {...rest}>{children}</button>
}
console.log('P7 optional child:', renderToStaticMarkup(<Card title="Updates" />))
console.log('P7 slots without child:', renderToStaticMarkup(<SlotPanel header="Updates" footer="Two tasks" />))
console.log('P7 button:', renderToStaticMarkup(<TaskButton disabled aria-label="Run updates">Run</TaskButton>))
