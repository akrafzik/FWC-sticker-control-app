import Link from "next/link";
import styles from "../styles/Card.module.css";
import classNames from "classnames";

const Card = ({ data }) => {
  return (
    <div className={styles.card}>
      {/* <img src={user.avatar} alt="Avatar" style={{ width: "100%" }} /> */}
      <div className={getCardClass(data.completed)}>
        <h4>
          <b>
            {data.title}
          </b>
        </h4>
        <h4>
          <b>
            {data.identifier}
          </b>
        </h4>
        {data.type == 'country' && <p>{data.completed? 'Completed' : `Remaining: ${data.remaining}`}</p>
        }
      </div>
    </div>
  );
};

const getCardClass = (completed) => {
  return classNames(
    styles.container,
    {
      [styles.completed]: completed
    }
  );
};
export default Card;
