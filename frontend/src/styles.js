
const styles = {
    page: {
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        padding: '20px',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        textAlign: 'left',
        padding: '12px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #eee',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    select: {
        padding: '6px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    cardsContainer: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },

    card: {
        flex: '1',
        minWidth: '120px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
};
export default styles;