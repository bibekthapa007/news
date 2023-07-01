

const isCategoriesEqual = (arr1: string[] | undefined, arr2: string[] | undefined) => {
    let same = true;
    if (!arr1 || !arr2) return false;
  
    if (arr1.length !== arr2.length) return false;
  
    arr1.map((data) => {
      if (!arr2.includes(data)) {
        same = false;
        return;
      }
    });
    return same;
  };

  export default isCategoriesEqual;