export const getLabelStyle = (label) => {
  switch (label.toLowerCase()) {
    case 'work':
      return 'bg-blue-100 text-blue-800';
    case 'personal':
      return 'bg-purple-100 text-purple-800';
    case 'urgent':
      return 'bg-red-100 text-red-800';
    case 'study':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
