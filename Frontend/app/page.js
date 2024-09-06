import Image from "next/image";
import GraphComponent from "./graphComponent";
//import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <header>
        <Image
        id="blockhouseLogo"
        src="/blockhouse_capital_logo.png"
        width={50}
        height={50}
        alt="Blockhouse logo"></Image>
        <h1 id='aboutTitle'>Blockhouse Dashboard w/ChartJS & Django</h1>
      </header>
      <section id='graphComponentHolder'>
      <GraphComponent typeChart='Line'></GraphComponent>
      <GraphComponent typeChart='Bar'></GraphComponent>
      <GraphComponent typeChart='Pie'></GraphComponent>
      <GraphComponent typeChart='Candlestick'></GraphComponent>
      </section>
    
    </main>
  );
}
