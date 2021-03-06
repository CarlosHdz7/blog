class Utilities {
  formatDate(date, format) {
    const map = {
      dd:
        date.getDate() < 10
          ? date.getDate().toString().padStart(2, '0')
          : date.getDate(),
      mm:
        date.getMonth() + 1 < 10
          ? (date.getMonth() + 1).toString().padStart(2, '0')
          : date.getMonth() + 1,
      yyyy: date.getFullYear(),
    };

    return format.replace(/dd|mm|yyyy/gi, (matched) => map[matched]);
  }

  arrayRemove(array, value) {
    return array.filter(function (item) {
      return item != value;
    });
  }

  setErrorMessage(container, errorElement) {
    container.appendChild(errorElement);
  }

  removeErrorMessage(container) {
    while (container.firstChild) container.removeChild(container.firstChild);
  }

  async clearBodyTable(bodyTable) {
    while (bodyTable.firstChild) bodyTable.removeChild(bodyTable.firstChild);
  }
}

export default Utilities;
