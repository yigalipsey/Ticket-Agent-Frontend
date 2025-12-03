import React from "react";
import { MapPin, Calendar } from "lucide-react";
import styles from "./TicketCard.module.css";

const TicketCard = () => {
  return (
    <div className={styles["container-cards-ticket"]}>
      <div className={styles["card-ticket"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={64}
          height={150}
          viewBox="0 0 64 150"
          fill="black"
        >
          <path d="M44 138V136.967H20V138H44Z" />
          <path d="M44 13.0328V12H20V13.0328H44Z" />
          <path d="M44 14.0656V13.5492H20V14.0656H44Z" />
          <path d="M44 15.6148V15.0984H20V15.6148H44Z" />
          <path d="M44 18.1967V17.6803H20V18.1967H44Z" />
          <path d="M44 20.2623V19.2295H20V20.2623H44Z" />
          <path d="M44 22.8443V22.3279H20V22.8443H44Z" />
          <path d="M44 23.877V23.3607H20V23.877H44Z" />
          <path d="M44 26.9754V24.9098H20V26.9754H44Z" />
          <path d="M44 28.0082V27.4918H20V28.0082H44Z" />
          <path d="M44 29.5574V29.041H20V29.5574H44Z" />
          <path d="M44 32.6557V30.5902H20V32.6557H44Z" />
          <path d="M44 33.6885V33.1721H20V33.6885H44Z" />
          <path d="M44 35.2376V34.7213H20V35.2376H44Z" />
          <path d="M44 36.2705V35.7541H20V36.2705H44Z" />
          <path d="M44 39.3689V37.3033H20V39.3689H44Z" />
          <path d="M44 40.918V40.4015H20V40.918H44Z" />
          <path d="M44 43.5001V41.4345H20V43.5001H44Z" />
          <path d="M44 45.0492V44.5327H20V45.0492H44Z" />
          <path d="M44 47.631V46.0819H20V47.631H44Z" />
          <path d="M44 49.1804V48.664H20V49.1804H44Z" />
          <path d="M44 51.2458V50.2131H20V51.2458H44Z" />
          <path d="M44 52.2787V51.7622H20V52.2787H44Z" />
          <path d="M44 54.3443V52.7952H20V54.3443H44Z" />
          <path d="M44 56.4099V55.377H20V56.4099H44Z" />
          <path d="M44 57.959V57.4426H20V57.959H44Z" />
          <path d="M44 60.0247V58.4753H20V60.0247H44Z" />
          <path d="M44 62.09V61.0573H20V62.09H44Z" />
          <path d="M44 63.6394V63.123H20V63.6394H44Z" />
          <path d="M44 66.7377V64.6721H20V66.7377H44Z" />
          <path d="M44 68.2868V67.7704H20V68.2868H44Z" />
          <path d="M44 69.3198V68.8033H20V69.3198H44Z" />
          <path d="M44 72.4181V71.3851H20V72.4181H44Z" />
          <path d="M44 73.4508V72.9345H20V73.4508H44Z" />
          <path d="M44 76.5493V74.4837H20V76.5493H44Z" />
          <path d="M44 77.5819V77.0655H20V77.5819H44Z" />
          <path d="M44 79.1311V78.6146H20V79.1311H44Z" />
          <path d="M44 80.6802V80.164H20V80.6802H44Z" />
          <path d="M44 82.2294V81.1967H20V82.2294H44Z" />
          <path d="M44 83.7788V83.2623H20V83.7788H44Z" />
          <path d="M44 86.3606V85.8441H20V86.3606H44Z" />
          <path d="M44 87.9097V87.3935H20V87.9097H44Z" />
          <path d="M44 91.0083V88.9427H20V91.0083H44Z" />
          <path d="M44 92.041V91.5245H20V92.041H44Z" />
          <path d="M44 94.623V92.5574H20V94.623H44Z" />
          <path d="M44 96.1722V95.6557H20V96.1722H44Z" />
          <path d="M44 97.7213V97.2048H20V97.7213H44Z" />
          <path d="M44 99.2704V98.2378H20V99.2704H44Z" />
          <path d="M44 100.82V100.303H20V100.82H44Z" />
          <path d="M44 103.402V102.885H20V103.402H44Z" />
          <path d="M44 105.467V104.434H20V105.467H44Z" />
          <path d="M44 108.049V106.5H20V108.049H44Z" />
          <path d="M44 109.082V108.566H20V109.082H44Z" />
          <path d="M44 112.18V111.148H20V112.18H44Z" />
          <path d="M44 113.213V112.697H20V113.213H44Z" />
          <path d="M44 114.762V114.246H20V114.762H44Z" />
          <path d="M44 118.377V116.311H20V118.377H44Z" />
          <path d="M44 119.41V118.893H20V119.41H44Z" />
          <path d="M44 120.442V119.926H20V120.442H44Z" />
          <path d="M44 122.508V120.959H20V122.508H44Z" />
          <path d="M44 124.574V123.541H20V124.574H44Z" />
          <path d="M44 127.672V125.607H20V127.672H44Z" />
          <path d="M44 128.705V128.188H20V128.705H44Z" />
          <path d="M44 130.254V129.738H20V130.254H44Z" />
          <path d="M44 132.32V131.287H20V132.32H44Z" />
          <path d="M44 135.418V133.869H20V135.418H44Z" />
          <path d="M44 136.451V135.934H20V136.451H44Z" />
        </svg>
        <div className={styles.separator}>
          <span className={styles["span-lines"]} />
        </div>
        <div className={styles["content-ticket"]}>
          <div className={styles["content-data"]}>
            <div className={styles.destination}>
              <div className={`${styles.dest} ${styles.start}`}>
                <p className={styles.country}>ריאל מדריד</p>
                <p className={styles.acronym}>RMA</p>
                <p className={styles.hour}>
                  <Calendar size={10} />
                  21:00
                </p>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-xs text-gray-400 font-bold">VS</span>
              </div>
              <div className={`${styles.dest} ${styles.end}`}>
                <p className={styles.country}>ברצלונה</p>
                <p className={styles.acronym}>BAR</p>
                <p className={styles.hour}>
                   <MapPin size={10} />
                   ברנבאו
                </p>
              </div>
            </div>
            <div style={{ borderBottom: "2px solid #e8e8e8" }} />
            <div className={styles["data-flex-col"]}>
              <div className={styles["data-flex"]}>
                <div className={styles.data}>
                  <p className={styles.title}>מזהה משחק</p>
                  <p className={styles.subtitle}>762151</p>
                </div>
                <div className={`${styles.data} ${styles.passenger}`}>
                  <p className={styles.title}>קטגוריה</p>
                  <p className={styles.subtitle}>VIP</p>
                </div>
              </div>
              <div className={styles["data-flex"]}>
                <div className={styles.data}>
                  <p className={styles.title}>ליגה</p>
                  <p className={styles.subtitle}>לה ליגה</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.title}>שער</p>
                  <p className={styles.subtitle}>A11</p>
                </div>
                <div className={styles.data}>
                  <p className={styles.title}>מושב</p>
                  <p className={styles.subtitle}>21C</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["container-icons"]}>
            <span className={styles["vertical-text"]}>Ticket Agent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;

