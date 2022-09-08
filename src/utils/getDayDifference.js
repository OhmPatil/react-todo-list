import {Timestamp} from 'firebase/firestore'

function getDayDifference(dueDate) {
  let diffTime = Math.abs(dueDate.toDate() - Timestamp.now().toDate());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
}

export default getDayDifference