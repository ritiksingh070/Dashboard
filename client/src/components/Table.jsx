// Table.js
import './Table.css'
const Table = ({ data }) => {
  return (
    
      <section className="userSection">
        <table id="users">
        <thead>
            <tr>
              <th colSpan={4}>Users Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
  );
};

export default Table;
