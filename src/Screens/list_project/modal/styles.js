import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center', // Alinha os itens verticalmente no centro
  },
  statusScrollContainer: {
    maxHeight: 200,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  statusOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedStatus: {
    fontWeight: 'bold',
    color: '#0097B2',
  },
  urgentButton: {
    marginLeft: 10, // Espaçamento entre o switch e o ícone
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#e53935',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '45%',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#0097B2',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '45%',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;