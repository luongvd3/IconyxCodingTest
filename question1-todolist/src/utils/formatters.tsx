export function formatValue(num: number | null | undefined): string {
    if (num === null || num === undefined) {
      return "N/A";
    }
    if (num < 0.1 && num > -0.1) {
    return num.toLocaleString();
    }
    if (num < 100 && num > -100) {
    return num.toLocaleString('en-US',{ maximumFractionDigits: 2 });
    }
    if (num < 1000 && num > -1000) {
    return num.toLocaleString('en-US',{ maximumFractionDigits: 2 });
    } 
    if (num < 1000000 && num > -1000000) {
    return num.toLocaleString('en-US',{ maximumFractionDigits: 2 });
    }
    if (num < 1000000000 && num > -1000000000) {
    return (num/1000000).toLocaleString('en-US',{ maximumFractionDigits: 2 })+"M";
    }
    if (num < 1000**4 && num > -(1000**4)) {
    return (num/1000000000).toLocaleString('en-US',{ maximumFractionDigits: 2 })+"B";
    }
    if (num < (1000**5) && num > -(1000**5)) {
    return (num/(1000**4)).toLocaleString('en-US',{ maximumFractionDigits: 2 })+"T";
    }
    return num.toLocaleString();
}

export function getPageCriteria(criteria: string[]): {
    pageNum: number;
    sortOrder: "asc" | "desc";
    filterType: string;
    filterCriteria: string;
} {    
    return {
      pageNum: criteria[0] ? Number(criteria[0]) : 1,
      sortOrder: criteria[1] === "asc" ? "asc" : "desc",
      filterType: criteria[2],
      filterCriteria: criteria[3],
    };
}

//For testing purposes
export function generateRandomString(length:number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
  
  