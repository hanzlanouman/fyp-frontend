import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

const ProjectDetails = () => {
  const { project } = useContext(StudentContext);
  console.log(project);

  const styles = {
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '500px',
      borderCollapse: 'collapse',
      marginBottom: '60px',
    },
    th: {
      border: '1px solid #e0e0e0',
      padding: '8px 12px',
      textAlign: 'left',
      backgroundColor: '#f5f5f5',
    },
    td: {
      border: '1px solid #e0e0e0',
      padding: '8px 12px',
      textAlign: 'left',
    },
    memberDiv: {
      marginBottom: '5px',
    },
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Project Name</th>
            <th style={styles.th}>Supervisor ID</th>
            <th style={styles.th}>Team Members</th>
            <th style={styles.th}>Registration No.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>{project.ProjectName}</td>
            <td style={styles.td}>{project.supervisor_empID}</td>
            <td style={styles.td}>
              {project.projectMembers.map((member, index) => (
                <div key={index} style={styles.memberDiv}>
                  {member.name}
                </div>
              ))}
            </td>
            <td style={styles.td}>
              {project.projectMembers.map((member, index) => (
                <div key={index} style={styles.memberDiv}>
                  {member.regNo}
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
