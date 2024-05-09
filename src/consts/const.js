const SERVER_URL = process.env.REACT_APP_ALGO_API;

const DETAIL = ["leu", "nit", "uro", "pro", "ph", "blo", "sg", "ket", "bil", "glu"];

const PREFIX = {
  "leu": ["Negative", "Trace", "Small", "Moderate", "Large"],
  "nit": ["Negative", "Positive", "Positive"],
  "uro": ["Normal", "Normal", "Trace", "Small", "Moderate", "Large"],  
  "pro": ["Negative", "Trace", "Small", "Moderate", "Large", "Large"], 
  "ph": ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5"],
  "blo": ["Negative", "Trace", "Small", "Moderate", "Large"],
  "sg": ["1.000", "1.005", "1.010", "1.015", "1.020", "1.025", "1.030"],
  "ket": ["Negative", "Trace", "15", "40", "80", "160"], 
  "bil": ["Negative", "Small", "Moderate", "Large"],
  "glu": ["Negative", "100", "250", "500", "1000", "2000"],
  // "glu": ["Negative", "Trace", "Small", "Moderate", "Large", "X Large"],
};

const SUFFIX = {
  "leu": ["", "", "+", "++", "+++"],
  "nit": ["", "+", "+"],
  "uro": ["", "", "+", "++", "+++", "++++"],
  "pro": ["", "", "+", "++", "+++", "++++"],
  "ph": ["", "", "", "", "", "", ""],
  "blo": ["", "", "+", "++", "+++"],
  "sg": ["", "", "", "", "", "", ""],
  "ket": ["", "", "+", "++", "+++", "++++"],
  "bil": ["", "+", "++", "+++"],
  "glu": ["", "", "+", "++", "+++", "++++"],
};

const ABNORMAL_DETAILS = {
  "leu": "Indicates a possible urinary tract infection or inflammation.",
  "nit": "Suggests the presence of certain bacteria that can cause urinary tract infections.",
  "uro": "Elevated levels may indicate liver problems or hemolytic anemia.",
  "pro": "Presence may suggest kidney disease, urinary tract infections, or other disorders.",
  "ph": "Abnormal pH levels can indicate kidney problems, urinary tract infections, or certain metabolic conditions.",
  "blo": "Presence may indicate kidney or urinary tract problems, infections, or certain cancers.",
  "sg": "Abnormal levels suggest the body's hydration status or kidney's concentrating ability.",
  "ket": "Presence may indicate uncontrolled diabetes, starvation, or a high-fat, low-carbohydrate diet.",
  "bil": "Elevated levels suggest liver problems, bile duct obstruction, or certain blood disorders.",
  "glu": "Presence may indicate diabetes, kidney problems, or other metabolic disorders."
}

export {
  SERVER_URL,
  ABNORMAL_DETAILS,
  DETAIL,
  PREFIX,
  SUFFIX
}