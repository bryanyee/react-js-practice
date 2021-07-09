import styles from './Table.module.css';

function Table()  {
  const people = [
    { name: 'Bob', age: 28, gender: 'male' },
    { name: 'Alice', age: 24, gender: 'female' },
    { name: 'Sandra', age: 32, gender: 'female' },
    { name: 'Jackson', age: 18, gender: 'male' },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Age</th>
          <th className={styles.th}>Gender</th>
        </tr>
      </thead>
      <tbody>
        {people.map(({ name, age, gender }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
