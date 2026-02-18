const getDateAndTime = (data) => {
  const iso = data;
  const date = new Date(iso);

  const dateStr = date.toISOString().split("T")[ 0 ];
  const timeStr = date.toISOString().split("T")[ 1 ].slice(0, 8);

  return dateStr + ' ' + timeStr;
}

export default getDateAndTime;