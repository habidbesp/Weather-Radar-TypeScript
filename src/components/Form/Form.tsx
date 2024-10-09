import { countries } from "../../data/countries";
import styles from "./Form.module.css";

export const Form = () => {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input id="city" name="city" type="text" placeholder="City" />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select name="" id="">
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Check Weather" className={styles.submit} />
    </form>
  );
};
