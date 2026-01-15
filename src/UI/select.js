import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import XLSX from 'xlsx';
import "./style.css";
import Select from "react-select";
import Button from '@mui/material/Button';



export default function SelectAutoWidth(props) {
    // React state to manage selected options
    const [selectedOptions, setSelectedOptions] = React.useState(null);
    const [SearchTerm_year, SetSearchTerm_year] = useState('2024');
    const [SearchTerm_year_1, SetSearchTerm_year_1] = useState('');
    const [Dataoptions, setDataoptions] = useState([]);


    const optionList = [
{ value: "Day 1,01-Jan,Matthew 1-3", label: "Day 1,01-Jan,Matthew 1-3" },
{ value: "Day 2,02-Jan,Matthew 4-6", label: "Day 2,02-Jan,Matthew 4-6" },
{ value: "Day 3,03-Jan,Matthew 7-9", label: "Day 3,03-Jan,Matthew 7-9" },
{ value: "Day 4,04-Jan,Matthew 10-12", label: "Day 4,04-Jan,Matthew 10-12" },
{ value: "Day 5,05-Jan,Matthew 13-15", label: "Day 5,05-Jan,Matthew 13-15" },
{ value: "Day 6,06-Jan,Matthew 16-18", label: "Day 6,06-Jan,Matthew 16-18" },
{ value: "Day 7,07-Jan,Matthew 19-21", label: "Day 7,07-Jan,Matthew 19-21" },
{ value: "Day 8,08-Jan,Matthew 22-24", label: "Day 8,08-Jan,Matthew 22-24" },
{ value: "Day 9,09-Jan,Matthew 25-26", label: "Day 9,09-Jan,Matthew 25-26" },
{ value: "Day 10,10-Jan,Matthew 27-28", label: "Day 10,10-Jan,Matthew 27-28" },

{ value: "Day 11,11-Jan,Mark 1-3", label: "Day 11,11-Jan,Mark 1-3" },
{ value: "Day 12,12-Jan,Mark 4-6", label: "Day 12,12-Jan,Mark 4-6" },
{ value: "Day 13,13-Jan,Mark 7-9", label: "Day 13,13-Jan,Mark 7-9" },
{ value: "Day 14,14-Jan,Mark 10-12", label: "Day 14,14-Jan,Mark 10-12" },
{ value: "Day 15,15-Jan,Mark 13-14", label: "Day 15,15-Jan,Mark 13-14" },
{ value: "Day 16,16-Jan,Mark 15-16", label: "Day 16,16-Jan,Mark 15-16" },
{ value: "Day 17,17-Jan,Luke 1-2", label: "Day 17,17-Jan,Luke 1-2" },
{ value: "Day 18,18-Jan,Luke 3-4", label: "Day 18,18-Jan,Luke 3-4" },
{ value: "Day 19,19-Jan,Luke 5-6", label: "Day 19,19-Jan,Luke 5-6" },
{ value: "Day 20,20-Jan,Luke 7-9", label: "Day 20,20-Jan,Luke 7-9" },

{ value: "Day 21,21-Jan,Luke 10-12", label: "Day 21,21-Jan,Luke 10-12" },
{ value: "Day 22,22-Jan,Luke 13-15", label: "Day 22,22-Jan,Luke 13-15" },
{ value: "Day 23,23-Jan,Luke 16-18", label: "Day 23,23-Jan,Luke 16-18" },
{ value: "Day 24,24-Jan,Luke 19-21", label: "Day 24,24-Jan,Luke 19-21" },
{ value: "Day 25,25-Jan,Luke 22-24", label: "Day 25,25-Jan,Luke 22-24" },

{ value: "Day 26,26-Jan,John 1-3", label: "Day 26,26-Jan,John 1-3" },
{ value: "Day 27,27-Jan,John 4-5", label: "Day 27,27-Jan,John 4-5" },
{ value: "Day 28,28-Jan,John 6-7", label: "Day 28,28-Jan,John 6-7" },
{ value: "Day 29,29-Jan,John 8-9", label: "Day 29,29-Jan,John 8-9" },
{ value: "Day 30,30-Jan,John 10-12", label: "Day 30,30-Jan,John 10-12" },

{ value: "Day 31,31-Jan,John 13-16", label: "Day 31,31-Jan,John 13-16" },

{ value: "Day 32,01-Feb,John 17-21", label: "Day 32,01-Feb,John 17-21" },
{ value: "Day 33,02-Feb,Acts 1-3", label: "Day 33,02-Feb,Acts 1-3" },
{ value: "Day 34,03-Feb,Acts 4-6", label: "Day 34,03-Feb,Acts 4-6" },
{ value: "Day 35,04-Feb,Acts 7-9", label: "Day 35,04-Feb,Acts 7-9" },
{ value: "Day 36,05-Feb,Acts 10-12", label: "Day 36,05-Feb,Acts 10-12" },
{ value: "Day 37,06-Feb,Acts 13-16", label: "Day 37,06-Feb,Acts 13-16" },
{ value: "Day 38,07-Feb,Acts 17-20", label: "Day 38,07-Feb,Acts 17-20" },
{ value: "Day 39,08-Feb,Acts 21-24", label: "Day 39,08-Feb,Acts 21-24" },
{ value: "Day 40,09-Feb,Acts 25-28", label: "Day 40,09-Feb,Acts 25-28" },

{ value: "Day 41,10-Feb,Romans 1-3", label: "Day 41,10-Feb,Romans 1-3" },
{ value: "Day 42,11-Feb,Romans 4-6", label: "Day 42,11-Feb,Romans 4-6" },
{ value: "Day 43,12-Feb,Romans 7-9", label: "Day 43,12-Feb,Romans 7-9" },
{ value: "Day 44,13-Feb,Romans 10-12", label: "Day 44,13-Feb,Romans 10-12" },
{ value: "Day 45,14-Feb,Romans 13-16", label: "Day 45,14-Feb,Romans 13-16" },

{ value: "Day 46,15-Feb,I Corinthians 1-3", label: "Day 46,15-Feb,I Corinthians 1-3" },
{ value: "Day 47,16-Feb,I Corinthians 4-6", label: "Day 47,16-Feb,I Corinthians 4-6" },
{ value: "Day 48,17-Feb,I Corinthians 7-9", label: "Day 48,17-Feb,I Corinthians 7-9" },
{ value: "Day 49,18-Feb,I Corinthians 10-12", label: "Day 49,18-Feb,I Corinthians 10-12" },
{ value: "Day 50,19-Feb,I Corinthians 13-16", label: "Day 50,19-Feb,I Corinthians 13-16" },

{ value: "Day 51,20-Feb,2 Corinthians 1-3", label: "Day 51,20-Feb,2 Corinthians 1-3" },
{ value: "Day 52,21-Feb,2 Corinthians 4-6", label: "Day 52,21-Feb,2 Corinthians 4-6" },
{ value: "Day 53,22-Feb,2 Corinthians 7-9", label: "Day 53,22-Feb,2 Corinthians 7-9" },
{ value: "Day 54,23-Feb,2 Corinthians 10-13", label: "Day 54,23-Feb,2 Corinthians 10-13" },
{ value: "Day 55,24-Feb,Galatians 1-3", label: "Day 55,24-Feb,Galatians 1-3" },
{ value: "Day 56,25-Feb,Galatians 4-6", label: "Day 56,25-Feb,Galatians 4-6" },
{ value: "Day 57,26-Feb,Ephesians 1-3", label: "Day 57,26-Feb,Ephesians 1-3" },
{ value: "Day 58,27-Feb,Ephesians 4-6", label: "Day 58,27-Feb,Ephesians 4-6" },
{ value: "Day 59,28-Feb,Philippians 1-4", label: "Day 59,28-Feb,Philippians 1-4" },

{ value: "Day 60,01-Mar,Colossians 1-4", label: "Day 60,01-Mar,Colossians 1-4" },
{ value: "Day 61,02-Mar,1 Thessalonians 1-5", label: "Day 61,02-Mar,1 Thessalonians 1-5" },
{ value: "Day 62,03-Mar,2 Thessalonians 1-3", label: "Day 62,03-Mar,2 Thessalonians 1-3" },
{ value: "Day 63,04-Mar,1 Timothy 1-3", label: "Day 63,04-Mar,1 Timothy 1-3" },
{ value: "Day 64,05-Mar,1 Timothy 4-6", label: "Day 64,05-Mar,1 Timothy 4-6" },
{ value: "Day 65,06-Mar,2 Timothy 1-4", label: "Day 65,06-Mar,2 Timothy 1-4" },
{ value: "Day 66,07-Mar,Titus 1-3, Philemon 1", label: "Day 66,07-Mar,Titus 1-3, Philemon 1" },
{ value: "Day 67,08-Mar,Hebrews 1-3", label: "Day 67,08-Mar,Hebrews 1-3" },
{ value: "Day 68,09-Mar,Hebrews 4-6", label: "Day 68,09-Mar,Hebrews 4-6" },
{ value: "Day 69,10-Mar,Hebrews 7-9", label: "Day 69,10-Mar,Hebrews 7-9" },

{ value: "Day 70,11-Mar,Hebrews 10-13", label: "Day 70,11-Mar,Hebrews 10-13" },
{ value: "Day 71,12-Mar,James 1-3", label: "Day 71,12-Mar,James 1-3" },
{ value: "Day 72,13-Mar,James 4-5", label: "Day 72,13-Mar,James 4-5" },
{ value: "Day 73,14-Mar,1 Peter 1-5", label: "Day 73,14-Mar,1 Peter 1-5" },
{ value: "Day 74,15-Mar,2 Peter 1-3", label: "Day 74,15-Mar,2 Peter 1-3" },
{ value: "Day 75,16-Mar,1 John 1-5", label: "Day 75,16-Mar,1 John 1-5" },
{ value: "Day 76,17-Mar,2 John,3 John,Jude", label: "Day 76,17-Mar,2 John,3 John,Jude" },
{ value: "Day 77,18-Mar,Revelation 1-3", label: "Day 77,18-Mar,Revelation 1-3" },
{ value: "Day 78,19-Mar,Revelation 4-6", label: "Day 78,19-Mar,Revelation 4-6" },
{ value: "Day 79,20-Mar,Revelation 7-9", label: "Day 79,20-Mar,Revelation 7-9" },

{ value: "Day 80,21-Mar,Revelation 10-12", label: "Day 80,21-Mar,Revelation 10-12" },
{ value: "Day 81,22-Mar,Revelation 13-15", label: "Day 81,22-Mar,Revelation 13-15" },
{ value: "Day 82,23-Mar,Revelation 16-18", label: "Day 82,23-Mar,Revelation 16-18" },
{ value: "Day 83,24-Mar,Revelation 19-22", label: "Day 83,24-Mar,Revelation 19-22" },

{ value: "Day 84,25-Mar,Genesis 1-3", label: "Day 84,25-Mar,Genesis 1-3" },
{ value: "Day 85,26-Mar,Genesis 4-6", label: "Day 85,26-Mar,Genesis 4-6" },
{ value: "Day 86,27-Mar,Genesis 7-9", label: "Day 86,27-Mar,Genesis 7-9" },
{ value: "Day 87,28-Mar,Genesis 10-12", label: "Day 87,28-Mar,Genesis 10-12" },
{ value: "Day 88,29-Mar,Genesis 13-15", label: "Day 88,29-Mar,Genesis 13-15" },
{ value: "Day 89,30-Mar,Genesis 16-18", label: "Day 89,30-Mar,Genesis 16-18" },
{ value: "Day 90,31-Mar,Genesis 19-21", label: "Day 90,31-Mar,Genesis 19-21" },

{ value: "Day 91,01-Apr,Genesis 22-24", label: "Day 91,01-Apr,Genesis 22-24" },
{ value: "Day 92,02-Apr,Genesis 25-27", label: "Day 92,02-Apr,Genesis 25-27" },
{ value: "Day 93,03-Apr,Genesis 28-30", label: "Day 93,03-Apr,Genesis 28-30" },
{ value: "Day 94,04-Apr,Genesis 31-33", label: "Day 94,04-Apr,Genesis 31-33" },
{ value: "Day 95,05-Apr,Genesis 34-36", label: "Day 95,05-Apr,Genesis 34-36" },
{ value: "Day 96,06-Apr,Genesis 37-39", label: "Day 96,06-Apr,Genesis 37-39" },
{ value: "Day 97,07-Apr,Genesis 40-42", label: "Day 97,07-Apr,Genesis 40-42" },
{ value: "Day 98,08-Apr,Genesis 43-45", label: "Day 98,08-Apr,Genesis 43-45" },
{ value: "Day 99,09-Apr,Genesis 46-48", label: "Day 99,09-Apr,Genesis 46-48" },
{ value: "Day 100,10-Apr,Genesis 49-50", label: "Day 100,10-Apr,Genesis 49-50" },

{ value: "Day 101,11-Apr,Exodus 1-3", label: "Day 101,11-Apr,Exodus 1-3" },
{ value: "Day 101,11-Apr,Exodus 1-3", label: "Day 101,11-Apr,Exodus 1-3" },
{ value: "Day 102,12-Apr,Exodus 4-6", label: "Day 102,12-Apr,Exodus 4-6" },
{ value: "Day 103,13-Apr,Exodus 7-9", label: "Day 103,13-Apr,Exodus 7-9" },
{ value: "Day 104,14-Apr,Exodus 10-12", label: "Day 104,14-Apr,Exodus 10-12" },
{ value: "Day 105,15-Apr,Exodus 13-15", label: "Day 105,15-Apr,Exodus 13-15" },
{ value: "Day 106,16-Apr,Exodus 16-18", label: "Day 106,16-Apr,Exodus 16-18" },
{ value: "Day 107,17-Apr,Exodus 19-21", label: "Day 107,17-Apr,Exodus 19-21" },
{ value: "Day 108,18-Apr,Exodus 22-24", label: "Day 108,18-Apr,Exodus 22-24" },
{ value: "Day 109,19-Apr,Exodus 25-27", label: "Day 109,19-Apr,Exodus 25-27" },
{ value: "Day 110,20-Apr,Exodus 28-30", label: "Day 110,20-Apr,Exodus 28-30" },

{ value: "Day 111,21-Apr,Exodus 31-33", label: "Day 111,21-Apr,Exodus 31-33" },
{ value: "Day 112,22-Apr,Exodus 34-36", label: "Day 112,22-Apr,Exodus 34-36" },
{ value: "Day 113,23-Apr,Exodus 37-40", label: "Day 113,23-Apr,Exodus 37-40" },
{ value: "Day 114,24-Apr,Leviticus 1-3", label: "Day 114,24-Apr,Leviticus 1-3" },
{ value: "Day 115,25-Apr,Leviticus 4-6", label: "Day 115,25-Apr,Leviticus 4-6" },
{ value: "Day 116,26-Apr,Leviticus 7-9", label: "Day 116,26-Apr,Leviticus 7-9" },
{ value: "Day 117,27-Apr,Leviticus 10-12", label: "Day 117,27-Apr,Leviticus 10-12" },
{ value: "Day 118,28-Apr,Leviticus 13-15", label: "Day 118,28-Apr,Leviticus 13-15" },
{ value: "Day 119,29-Apr,Leviticus 16-18", label: "Day 119,29-Apr,Leviticus 16-18" },
{ value: "Day 120,30-Apr,Leviticus 19-21", label: "Day 120,30-Apr,Leviticus 19-21" },

{ value: "Day 121,01-May,Leviticus 22-24", label: "Day 121,01-May,Leviticus 22-24" },
{ value: "Day 122,02-May,Leviticus 25-27", label: "Day 122,02-May,Leviticus 25-27" },
{ value: "Day 123,03-May,Numbers 1-4", label: "Day 123,03-May,Numbers 1-4" },
{ value: "Day 124,04-May,Numbers 5-8", label: "Day 124,04-May,Numbers 5-8" },
{ value: "Day 125,05-May,Numbers 9-12", label: "Day 125,05-May,Numbers 9-12" },
{ value: "Day 126,06-May,Numbers 13-16", label: "Day 126,06-May,Numbers 13-16" },
{ value: "Day 127,07-May,Numbers 17-20", label: "Day 127,07-May,Numbers 17-20" },
{ value: "Day 128,08-May,Numbers 21-24", label: "Day 128,08-May,Numbers 21-24" },
{ value: "Day 129,09-May,Numbers 25-28", label: "Day 129,09-May,Numbers 25-28" },
{ value: "Day 130,10-May,Numbers 29-32", label: "Day 130,10-May,Numbers 29-32" },

{ value: "Day 131,11-May,Numbers 33-36", label: "Day 131,11-May,Numbers 33-36" },
{ value: "Day 132,12-May,Deuteronomy 1-3", label: "Day 132,12-May,Deuteronomy 1-3" },
{ value: "Day 133,13-May,Deuteronomy 4-6", label: "Day 133,13-May,Deuteronomy 4-6" },
{ value: "Day 134,14-May,Deuteronomy 7-9", label: "Day 134,14-May,Deuteronomy 7-9" },
{ value: "Day 135,15-May,Deuteronomy 10-12", label: "Day 135,15-May,Deuteronomy 10-12" },
{ value: "Day 136,16-May,Deuteronomy 13-15", label: "Day 136,16-May,Deuteronomy 13-15" },
{ value: "Day 137,17-May,Deuteronomy 16-18", label: "Day 137,17-May,Deuteronomy 16-18" },
{ value: "Day 138,18-May,Deuteronomy 19-21", label: "Day 138,18-May,Deuteronomy 19-21" },
{ value: "Day 139,19-May,Deuteronomy 22-24", label: "Day 139,19-May,Deuteronomy 22-24" },
{ value: "Day 140,20-May,Deuteronomy 25-27", label: "Day 140,20-May,Deuteronomy 25-27" },

{ value: "Day 141,21-May,Deuteronomy 28-30", label: "Day 141,21-May,Deuteronomy 28-30" },
{ value: "Day 142,22-May,Deuteronomy 31-34", label: "Day 142,22-May,Deuteronomy 31-34" },
{ value: "Day 143,23-May,Joshua 1-3", label: "Day 143,23-May,Joshua 1-3" },
{ value: "Day 144,24-May,Joshua 4-6", label: "Day 144,24-May,Joshua 4-6" },
{ value: "Day 145,25-May,Joshua 7-9", label: "Day 145,25-May,Joshua 7-9" },
{ value: "Day 146,26-May,Joshua 10-12", label: "Day 146,26-May,Joshua 10-12" },
{ value: "Day 147,27-May,Joshua 13-15", label: "Day 147,27-May,Joshua 13-15" },
{ value: "Day 148,28-May,Joshua 16-18", label: "Day 148,28-May,Joshua 16-18" },
{ value: "Day 149,29-May,Joshua 19-21", label: "Day 149,29-May,Joshua 19-21" },
{ value: "Day 150,30-May,Joshua 22-24", label: "Day 150,30-May,Joshua 22-24" },

{ value: "Day 151,31-May,Judges 1-3", label: "Day 151,31-May,Judges 1-3" },
{ value: "Day 152,01-Jun,Judges 4-6", label: "Day 152,01-Jun,Judges 4-6" },
{ value: "Day 153,02-Jun,Judges 7-9", label: "Day 153,02-Jun,Judges 7-9" },
{ value: "Day 154,03-Jun,Judges 10-12", label: "Day 154,03-Jun,Judges 10-12" },
{ value: "Day 155,04-Jun,Judges 13-15", label: "Day 155,04-Jun,Judges 13-15" },
{ value: "Day 156,05-Jun,Judges 16-18", label: "Day 156,05-Jun,Judges 16-18" },
{ value: "Day 157,06-Jun,Judges 19-21", label: "Day 157,06-Jun,Judges 19-21" },
{ value: "Day 158,07-Jun,Ruth 1-4", label: "Day 158,07-Jun,Ruth 1-4" },
{ value: "Day 159,08-Jun,1 Samuel 1-3", label: "Day 159,08-Jun,1 Samuel 1-3" },
{ value: "Day 160,09-Jun,1 Samuel 4-6", label: "Day 160,09-Jun,1 Samuel 4-6" },

{ value: "Day 161,10-Jun,1 Samuel 7-9", label: "Day 161,10-Jun,1 Samuel 7-9" },
{ value: "Day 162,11-Jun,1 Samuel 10-12", label: "Day 162,11-Jun,1 Samuel 10-12" },
{ value: "Day 163,12-Jun,1 Samuel 13-15", label: "Day 163,12-Jun,1 Samuel 13-15" },
{ value: "Day 164,13-Jun,1 Samuel 16-18", label: "Day 164,13-Jun,1 Samuel 16-18" },
{ value: "Day 165,14-Jun,1 Samuel 19-21", label: "Day 165,14-Jun,1 Samuel 19-21" },
{ value: "Day 166,15-Jun,1 Samuel 22-24", label: "Day 166,15-Jun,1 Samuel 22-24" },
{ value: "Day 167,16-Jun,1 Samuel 25-27", label: "Day 167,16-Jun,1 Samuel 25-27" },
{ value: "Day 168,17-Jun,1 Samuel 28-31", label: "Day 168,17-Jun,1 Samuel 28-31" },
{ value: "Day 169,18-Jun,2 Samuel 1-3", label: "Day 169,18-Jun,2 Samuel 1-3" },
{ value: "Day 170,19-Jun,2 Samuel 4-6", label: "Day 170,19-Jun,2 Samuel 4-6" },

{ value: "Day 171,20-Jun,2 Samuel 7-9", label: "Day 171,20-Jun,2 Samuel 7-9" },
{ value: "Day 172,21-Jun,2 Samuel 10-12", label: "Day 172,21-Jun,2 Samuel 10-12" },
{ value: "Day 173,22-Jun,2 Samuel 13-15", label: "Day 173,22-Jun,2 Samuel 13-15" },
{ value: "Day 174,23-Jun,2 Samuel 16-18", label: "Day 174,23-Jun,2 Samuel 16-18" },
{ value: "Day 175,24-Jun,2 Samuel 19-21", label: "Day 175,24-Jun,2 Samuel 19-21" },
{ value: "Day 176,25-Jun,2 Samuel 22-24", label: "Day 176,25-Jun,2 Samuel 22-24" },
{ value: "Day 177,26-Jun,1 Kings 1-3", label: "Day 177,26-Jun,1 Kings 1-3" },
{ value: "Day 178,27-Jun,1 Kings 4-6", label: "Day 178,27-Jun,1 Kings 4-6" },
{ value: "Day 179,28-Jun,1 Kings 7-9", label: "Day 179,28-Jun,1 Kings 7-9" },
{ value: "Day 180,29-Jun,1 Kings 10-12", label: "Day 180,29-Jun,1 Kings 10-12" },

{ value: "Day 181,30-Jun,1 Kings 13-15", label: "Day 181,30-Jun,1 Kings 13-15" },
{ value: "Day 182,01-Jul,1 Kings 16-18", label: "Day 182,01-Jul,1 Kings 16-18" },
{ value: "Day 183,02-Jul,1 Kings 19-22", label: "Day 183,02-Jul,1 Kings 19-22" },
{ value: "Day 184,03-Jul,2 Kings 1-3", label: "Day 184,03-Jul,2 Kings 1-3" },
{ value: "Day 185,04-Jul,2 Kings 4-6", label: "Day 185,04-Jul,2 Kings 4-6" },
{ value: "Day 186,05-Jul,2 Kings 7-9", label: "Day 186,05-Jul,2 Kings 7-9" },
{ value: "Day 187,06-Jul,2 Kings 10-12", label: "Day 187,06-Jul,2 Kings 10-12" },
{ value: "Day 188,07-Jul,2 Kings 13-15", label: "Day 188,07-Jul,2 Kings 13-15" },
{ value: "Day 189,08-Jul,2 Kings 16-18", label: "Day 189,08-Jul,2 Kings 16-18" },
{ value: "Day 190,09-Jul,2 Kings 19-21", label: "Day 190,09-Jul,2 Kings 19-21" },

{ value: "Day 191,10-Jul,2 Kings 22-25", label: "Day 191,10-Jul,2 Kings 22-25" },
{ value: "Day 192,11-Jul,1 Chronicles 1-3", label: "Day 192,11-Jul,1 Chronicles 1-3" },
{ value: "Day 193,12-Jul,1 Chronicles 4-6", label: "Day 193,12-Jul,1 Chronicles 4-6" },
{ value: "Day 194,13-Jul,1 Chronicles 7-9", label: "Day 194,13-Jul,1 Chronicles 7-9" },
{ value: "Day 195,14-Jul,1 Chronicles 10-12", label: "Day 195,14-Jul,1 Chronicles 10-12" },
{ value: "Day 196,15-Jul,1 Chronicles 13-15", label: "Day 196,15-Jul,1 Chronicles 13-15" },
{ value: "Day 197,16-Jul,1 Chronicles 16-18", label: "Day 197,16-Jul,1 Chronicles 16-18" },
{ value: "Day 198,17-Jul,1 Chronicles 19-21", label: "Day 198,17-Jul,1 Chronicles 19-21" },
{ value: "Day 199,18-Jul,1 Chronicles 22-24", label: "Day 199,18-Jul,1 Chronicles 22-24" },
{ value: "Day 200,19-Jul,1 Chronicles 25-27", label: "Day 200,19-Jul,1 Chronicles 25-27" },
{ value: "Day 201,20-Jul,1 Chronicles 28-29", label: "Day 201,20-Jul,1 Chronicles 28-29" },
{ value: "Day 202,21-Jul,2 Chronicles 1-3", label: "Day 202,21-Jul,2 Chronicles 1-3" },
{ value: "Day 203,22-Jul,2 Chronicles 4-6", label: "Day 203,22-Jul,2 Chronicles 4-6" },
{ value: "Day 204,23-Jul,2 Chronicles 7-9", label: "Day 204,23-Jul,2 Chronicles 7-9" },
{ value: "Day 205,24-Jul,2 Chronicles 10-12", label: "Day 205,24-Jul,2 Chronicles 10-12" },
{ value: "Day 206,25-Jul,2 Chronicles 13-15", label: "Day 206,25-Jul,2 Chronicles 13-15" },
{ value: "Day 207,26-Jul,2 Chronicles 16-18", label: "Day 207,26-Jul,2 Chronicles 16-18" },
{ value: "Day 208,27-Jul,2 Chronicles 19-21", label: "Day 208,27-Jul,2 Chronicles 19-21" },
{ value: "Day 209,28-Jul,2 Chronicles 22-24", label: "Day 209,28-Jul,2 Chronicles 22-24" },
{ value: "Day 210,29-Jul,2 Chronicles 25-27", label: "Day 210,29-Jul,2 Chronicles 25-27" },

{ value: "Day 211,30-Jul,2 Chronicles 28-30", label: "Day 211,30-Jul,2 Chronicles 28-30" },
{ value: "Day 212,31-Jul,2 Chronicles 31-33", label: "Day 212,31-Jul,2 Chronicles 31-33" },
{ value: "Day 213,01-Aug,2 Chronicles 34-36", label: "Day 213,01-Aug,2 Chronicles 34-36" },
{ value: "Day 214,02-Aug,Ezra 1-3", label: "Day 214,02-Aug,Ezra 1-3" },
{ value: "Day 215,03-Aug,Ezra 4-6", label: "Day 215,03-Aug,Ezra 4-6" },
{ value: "Day 216,04-Aug,Ezra 7-10", label: "Day 216,04-Aug,Ezra 7-10" },
{ value: "Day 217,05-Aug,Nehemiah 1-3", label: "Day 217,05-Aug,Nehemiah 1-3" },
{ value: "Day 218,06-Aug,Nehemiah 4-6", label: "Day 218,06-Aug,Nehemiah 4-6" },
{ value: "Day 219,07-Aug,Nehemiah 7-9", label: "Day 219,07-Aug,Nehemiah 7-9" },
{ value: "Day 220,08-Aug,Nehemiah 10-13", label: "Day 220,08-Aug,Nehemiah 10-13" },

{ value: "Day 221,09-Aug,Esther 1-3", label: "Day 221,09-Aug,Esther 1-3" },
{ value: "Day 222,10-Aug,Esther 4-6", label: "Day 222,10-Aug,Esther 4-6" },
{ value: "Day 223,11-Aug,Esther 7-10", label: "Day 223,11-Aug,Esther 7-10" },
{ value: "Day 224,12-Aug,Job 1-3", label: "Day 224,12-Aug,Job 1-3" },
{ value: "Day 225,13-Aug,Job 4-6", label: "Day 225,13-Aug,Job 4-6" },
{ value: "Day 226,14-Aug,Job 7-9", label: "Day 226,14-Aug,Job 7-9" },
{ value: "Day 227,15-Aug,Job 10-12", label: "Day 227,15-Aug,Job 10-12" },
{ value: "Day 228,16-Aug,Job 13-15", label: "Day 228,16-Aug,Job 13-15" },
{ value: "Day 229,17-Aug,Job 16-18", label: "Day 229,17-Aug,Job 16-18" },
{ value: "Day 230,18-Aug,Job 19-21", label: "Day 230,18-Aug,Job 19-21" },

{ value: "Day 231,19-Aug,Job 22-24", label: "Day 231,19-Aug,Job 22-24" },
{ value: "Day 232,20-Aug,Job 25-27", label: "Day 232,20-Aug,Job 25-27" },
{ value: "Day 233,21-Aug,Job 28-30", label: "Day 233,21-Aug,Job 28-30" },
{ value: "Day 234,22-Aug,Job 31-33", label: "Day 234,22-Aug,Job 31-33" },
{ value: "Day 235,23-Aug,Job 34-36", label: "Day 235,23-Aug,Job 34-36" },
{ value: "Day 236,24-Aug,Job 37-39", label: "Day 236,24-Aug,Job 37-39" },
{ value: "Day 237,25-Aug,Job 40-42", label: "Day 237,25-Aug,Job 40-42" },
{ value: "Day 238,26-Aug,Psalms 1-8", label: "Day 238,26-Aug,Psalms 1-8" },
{ value: "Day 239,27-Aug,Psalms 9-16", label: "Day 239,27-Aug,Psalms 9-16" },
{ value: "Day 240,28-Aug,Psalms 17-20", label: "Day 240,28-Aug,Psalms 17-20" },

{ value: "Day 241,29-Aug,Psalms 21-26", label: "Day 241,29-Aug,Psalms 21-26" },
{ value: "Day 242,30-Aug,Psalms 27-32", label: "Day 242,30-Aug,Psalms 27-32" },
{ value: "Day 243,31-Aug,Psalms 33-37", label: "Day 243,31-Aug,Psalms 33-37" },

{ value: "Day 244,01-Sep,Psalms 38-43", label: "Day 244,01-Sep,Psalms 38-43" },
{ value: "Day 245,02-Sep,Psalms 44-50", label: "Day 245,02-Sep,Psalms 44-50" },
{ value: "Day 246,03-Sep,Psalms 51-58", label: "Day 246,03-Sep,Psalms 51-58" },
{ value: "Day 247,04-Sep,Psalms 59-66", label: "Day 247,04-Sep,Psalms 59-66" },
{ value: "Day 248,05-Sep,Psalms 67-70", label: "Day 248,05-Sep,Psalms 67-70" },
{ value: "Day 249,06-Sep,Psalms 71-75", label: "Day 249,06-Sep,Psalms 71-75" },
{ value: "Day 250,07-Sep,Psalms 76-79", label: "Day 250,07-Sep,Psalms 76-79" },
{ value: "Day 251,08-Sep,Psalms 80-86", label: "Day 251,08-Sep,Psalms 80-86" },
{ value: "Day 252,09-Sep,Psalms 87-90", label: "Day 252,09-Sep,Psalms 87-90" },
{ value: "Day 253,10-Sep,Psalms 91-98", label: "Day 253,10-Sep,Psalms 91-98" },

{ value: "Day 254,11-Sep,Psalms 99-104", label: "Day 254,11-Sep,Psalms 99-104" },
{ value: "Day 255,12-Sep,Psalms 105-107", label: "Day 255,12-Sep,Psalms 105-107" },
{ value: "Day 256,13-Sep,Psalms 108-118", label: "Day 256,13-Sep,Psalms 108-118" },
{ value: "Day 257,14-Sep,Psalms 119", label: "Day 257,14-Sep,Psalms 119" },
{ value: "Day 258,15-Sep,Psalms 120-125", label: "Day 258,15-Sep,Psalms 120-125" },
{ value: "Day 259,16-Sep,Psalms 126-130", label: "Day 259,16-Sep,Psalms 126-130" },
{ value: "Day 260,17-Sep,Psalms 131-138", label: "Day 260,17-Sep,Psalms 131-138" },
{ value: "Day 261,18-Sep,Psalms 139-144", label: "Day 261,18-Sep,Psalms 139-144" },
{ value: "Day 262,19-Sep,Psalms 145-150", label: "Day 262,19-Sep,Psalms 145-150" },

{ value: "Day 263,20-Sep,Proverbs 1-3", label: "Day 263,20-Sep,Proverbs 1-3" },
{ value: "Day 264,21-Sep,Proverbs 4-6", label: "Day 264,21-Sep,Proverbs 4-6" },
{ value: "Day 265,22-Sep,Proverbs 7-9", label: "Day 265,22-Sep,Proverbs 7-9" },
{ value: "Day 266,23-Sep,Proverbs 10-12", label: "Day 266,23-Sep,Proverbs 10-12" },
{ value: "Day 267,24-Sep,Proverbs 13-15", label: "Day 267,24-Sep,Proverbs 13-15" },
{ value: "Day 268,25-Sep,Proverbs 16-18", label: "Day 268,25-Sep,Proverbs 16-18" },
{ value: "Day 269,26-Sep,Proverbs 19-21", label: "Day 269,26-Sep,Proverbs 19-21" },
{ value: "Day 270,27-Sep,Proverbs 22-24", label: "Day 270,27-Sep,Proverbs 22-24" },
{ value: "Day 271,28-Sep,Proverbs 25-27", label: "Day 271,28-Sep,Proverbs 25-27" },
{ value: "Day 272,29-Sep,Proverbs 28-31", label: "Day 272,29-Sep,Proverbs 28-31" },

{ value: "Day 273,30-Sep,Ecclesiastes 1-4", label: "Day 273,30-Sep,Ecclesiastes 1-4" },

{ value: "Day 274,01-Oct,Ecclesiastes 5-8", label: "Day 274,01-Oct,Ecclesiastes 5-8" },
{ value: "Day 275,02-Oct,Ecclesiastes 9-12", label: "Day 275,02-Oct,Ecclesiastes 9-12" },
{ value: "Day 276,03-Oct,Song of Solomon 1-4", label: "Day 276,03-Oct,Song of Solomon 1-4" },
{ value: "Day 277,04-Oct,Song of Solomon 5-8", label: "Day 277,04-Oct,Song of Solomon 5-8" },
{ value: "Day 278,05-Oct,Isaiah 1-3", label: "Day 278,05-Oct,Isaiah 1-3" },
{ value: "Day 279,06-Oct,Isaiah 4-6", label: "Day 279,06-Oct,Isaiah 4-6" },
{ value: "Day 280,07-Oct,Isaiah 7-9", label: "Day 280,07-Oct,Isaiah 7-9" },
{ value: "Day 281,08-Oct,Isaiah 10-12", label: "Day 281,08-Oct,Isaiah 10-12" },
{ value: "Day 282,09-Oct,Isaiah 13-15", label: "Day 282,09-Oct,Isaiah 13-15" },
{ value: "Day 283,10-Oct,Isaiah 16-18", label: "Day 283,10-Oct,Isaiah 16-18" },

{ value: "Day 284,11-Oct,Isaiah 19-21", label: "Day 284,11-Oct,Isaiah 19-21" },
{ value: "Day 285,12-Oct,Isaiah 22-24", label: "Day 285,12-Oct,Isaiah 22-24" },
{ value: "Day 286,13-Oct,Isaiah 25-27", label: "Day 286,13-Oct,Isaiah 25-27" },
{ value: "Day 287,14-Oct,Isaiah 28-30", label: "Day 287,14-Oct,Isaiah 28-30" },
{ value: "Day 288,15-Oct,Isaiah 31-33", label: "Day 288,15-Oct,Isaiah 31-33" },
{ value: "Day 289,16-Oct,Isaiah 34-36", label: "Day 289,16-Oct,Isaiah 34-36" },
{ value: "Day 290,17-Oct,Isaiah 37-39", label: "Day 290,17-Oct,Isaiah 37-39" },
{ value: "Day 291,18-Oct,Isaiah 40-42", label: "Day 291,18-Oct,Isaiah 40-42" },
{ value: "Day 292,19-Oct,Isaiah 43-45", label: "Day 292,19-Oct,Isaiah 43-45" },
{ value: "Day 293,20-Oct,Isaiah 46-48", label: "Day 293,20-Oct,Isaiah 46-48" },

{ value: "Day 294,21-Oct,Isaiah 49-51", label: "Day 294,21-Oct,Isaiah 49-51" },
{ value: "Day 295,22-Oct,Isaiah 52-54", label: "Day 295,22-Oct,Isaiah 52-54" },
{ value: "Day 296,23-Oct,Isaiah 55-57", label: "Day 296,23-Oct,Isaiah 55-57" },
{ value: "Day 297,24-Oct,Isaiah 58-60", label: "Day 297,24-Oct,Isaiah 58-60" },
{ value: "Day 298,25-Oct,Isaiah 61-63", label: "Day 298,25-Oct,Isaiah 61-63" },
{ value: "Day 299,26-Oct,Isaiah 64-66", label: "Day 299,26-Oct,Isaiah 64-66" },
{ value: "Day 300,27-Oct,Jeremiah 1-3", label: "Day 300,27-Oct,Jeremiah 1-3" },

{ value: "Day 301,28-Oct,Jeremiah 4-6", label: "Day 301,28-Oct,Jeremiah 4-6" },
{ value: "Day 302,29-Oct,Jeremiah 7-9", label: "Day 302,29-Oct,Jeremiah 7-9" },
{ value: "Day 303,30-Oct,Jeremiah 10-12", label: "Day 303,30-Oct,Jeremiah 10-12" },
{ value: "Day 304,31-Oct,Jeremiah 13-15", label: "Day 304,31-Oct,Jeremiah 13-15" },

{ value: "Day 305,01-Nov,Jeremiah 16-18", label: "Day 305,01-Nov,Jeremiah 16-18" },
{ value: "Day 306,02-Nov,Jeremiah 19-21", label: "Day 306,02-Nov,Jeremiah 19-21" },
{ value: "Day 307,03-Nov,Jeremiah 22-24", label: "Day 307,03-Nov,Jeremiah 22-24" },
{ value: "Day 308,04-Nov,Jeremiah 25-27", label: "Day 308,04-Nov,Jeremiah 25-27" },
{ value: "Day 309,05-Nov,Jeremiah 28-30", label: "Day 309,05-Nov,Jeremiah 28-30" },
{ value: "Day 310,06-Nov,Jeremiah 31-33", label: "Day 310,06-Nov,Jeremiah 31-33" },
{ value: "Day 311,07-Nov,Jeremiah 34-36", label: "Day 311,07-Nov,Jeremiah 34-36" },
{ value: "Day 312,08-Nov,Jeremiah 37-39", label: "Day 312,08-Nov,Jeremiah 37-39" },
{ value: "Day 313,09-Nov,Jeremiah 40-42", label: "Day 313,09-Nov,Jeremiah 40-42" },
{ value: "Day 314,10-Nov,Jeremiah 43-45", label: "Day 314,10-Nov,Jeremiah 43-45" },

{ value: "Day 315,11-Nov,Jeremiah 46-48", label: "Day 315,11-Nov,Jeremiah 46-48" },
{ value: "Day 316,12-Nov,Jeremiah 49-50", label: "Day 316,12-Nov,Jeremiah 49-50" },
{ value: "Day 317,13-Nov,Jeremiah 51-52", label: "Day 317,13-Nov,Jeremiah 51-52" },
{ value: "Day 318,14-Nov,Lamentations 1-3", label: "Day 318,14-Nov,Lamentations 1-3" },
{ value: "Day 319,15-Nov,Lamentations 4-5", label: "Day 319,15-Nov,Lamentations 4-5" },
{ value: "Day 320,16-Nov,Ezekiel 1-3", label: "Day 320,16-Nov,Ezekiel 1-3" },
{ value: "Day 321,17-Nov,Ezekiel 4-6", label: "Day 321,17-Nov,Ezekiel 4-6" },
{ value: "Day 322,18-Nov,Ezekiel 7-9", label: "Day 322,18-Nov,Ezekiel 7-9" },
{ value: "Day 323,19-Nov,Ezekiel 10-12", label: "Day 323,19-Nov,Ezekiel 10-12" },
{ value: "Day 324,20-Nov,Ezekiel 13-15", label: "Day 324,20-Nov,Ezekiel 13-15" },

{ value: "Day 325,21-Nov,Ezekiel 16-18", label: "Day 325,21-Nov,Ezekiel 16-18" },
{ value: "Day 326,22-Nov,Ezekiel 19-21", label: "Day 326,22-Nov,Ezekiel 19-21" },
{ value: "Day 327,23-Nov,Ezekiel 22-24", label: "Day 327,23-Nov,Ezekiel 22-24" },
{ value: "Day 328,24-Nov,Ezekiel 25-27", label: "Day 328,24-Nov,Ezekiel 25-27" },
{ value: "Day 329,25-Nov,Ezekiel 28-30", label: "Day 329,25-Nov,Ezekiel 28-30" },
{ value: "Day 330,26-Nov,Ezekiel 31-33", label: "Day 330,26-Nov,Ezekiel 31-33" },
{ value: "Day 331,27-Nov,Ezekiel 34-36", label: "Day 331,27-Nov,Ezekiel 34-36" },
{ value: "Day 332,28-Nov,Ezekiel 37-39", label: "Day 332,28-Nov,Ezekiel 37-39" },
{ value: "Day 333,29-Nov,Ezekiel 40-42", label: "Day 333,29-Nov,Ezekiel 40-42" },
{ value: "Day 334,30-Nov,Ezekiel 43-45", label: "Day 334,30-Nov,Ezekiel 43-45" },

{ value: "Day 335,01-Dec,Ezekiel 46-48", label: "Day 335,01-Dec,Ezekiel 46-48" },
{ value: "Day 336,02-Dec,Daniel 1-4", label: "Day 336,02-Dec,Daniel 1-4" },
{ value: "Day 337,03-Dec,Daniel 5-8", label: "Day 337,03-Dec,Daniel 5-8" },
{ value: "Day 338,04-Dec,Daniel 9-12", label: "Day 338,04-Dec,Daniel 9-12" },
{ value: "Day 339,05-Dec,Hosea 1-3", label: "Day 339,05-Dec,Hosea 1-3" },
{ value: "Day 340,06-Dec,Hosea 4-6", label: "Day 340,06-Dec,Hosea 4-6" },
{ value: "Day 341,07-Dec,Hosea 7-9", label: "Day 341,07-Dec,Hosea 7-9" },
{ value: "Day 342,08-Dec,Hosea 10-12", label: "Day 342,08-Dec,Hosea 10-12" },
{ value: "Day 343,09-Dec,Hosea 13-14", label: "Day 343,09-Dec,Hosea 13-14" },
{ value: "Day 344,10-Dec,Joel 1-3", label: "Day 344,10-Dec,Joel 1-3" },

{ value: "Day 345,11-Dec,Amos 1-4", label: "Day 345,11-Dec,Amos 1-4" },
{ value: "Day 346,12-Dec,Amos 5-9", label: "Day 346,12-Dec,Amos 5-9" },
{ value: "Day 347,13-Dec,Obadiah 1, Jonah 1-4", label: "Day 347,13-Dec,Obadiah 1, Jonah 1-4" },
{ value: "Day 348,14-Dec,Micah 1-4", label: "Day 348,14-Dec,Micah 1-4" },
{ value: "Day 349,15-Dec,Micah 5-7", label: "Day 349,15-Dec,Micah 5-7" },
{ value: "Day 350,16-Dec,Nahum 1-3", label: "Day 350,16-Dec,Nahum 1-3" },
{ value: "Day 351,17-Dec,Habakkuk 1-3", label: "Day 351,17-Dec,Habakkuk 1-3" },
{ value: "Day 352,18-Dec,Zephaniah 1-3", label: "Day 352,18-Dec,Zephaniah 1-3" },
{ value: "Day 353,19-Dec,Haggai 1-2", label: "Day 353,19-Dec,Haggai 1-2" },
{ value: "Day 354,20-Dec,Zechariah 1-4", label: "Day 354,20-Dec,Zechariah 1-4" },

{ value: "Day 355,21-Dec,Zechariah 5-8", label: "Day 355,21-Dec,Zechariah 5-8" },
{ value: "Day 356,22-Dec,Zechariah 9-12", label: "Day 356,22-Dec,Zechariah 9-12" },
{ value: "Day 357,23-Dec,Zechariah 13-14", label: "Day 357,23-Dec,Zechariah 13-14" },
{ value: "Day 358,24-Dec,Malachi 1-4", label: "Day 358,24-Dec,Malachi 1-4" },
{ value: "Day 359,25-Dec,Matthew 1-2, Luke 2", label: "Day 359,25-Dec,Matthew 1-2, Luke 2" },
{ value: "Day 360,26-Dec,Psalm 139", label: "Day 360,26-Dec,Psalm 139" },
{ value: "Day 361,27-Dec,Proverbs 31", label: "Day 361,27-Dec,Proverbs 31" },
{ value: "Day 362,28-Dec,Psalm 148", label: "Day 362,28-Dec,Psalm 148" },
{ value: "Day 363,29-Dec,Hebrews 11", label: "Day 363,29-Dec,Hebrews 11" },
{ value: "Day 364,30-Dec,Psalm 103", label: "Day 364,30-Dec,Psalm 103" },
{ value: "Day 365,31-Dec,Isaiah 43", label: "Day 365,31-Dec,Isaiah 43" }

    ]



    const optionList_year = [
        { value: '2026', label: '2026' },

    ];
    //Function triggered on selection
    function handleSelect(data) {
        setSelectedOptions(data);
        console.log(data.value)
        const selectedValue = data.value;

        // Add the year to the selected value (before the existing string)
        const formattedValue = `${selectedValue},${SearchTerm_year_1}`;

        // Log the formatted value
        console.log("Formatted Value:", formattedValue);
        props.sendDataToParent(formattedValue)
    }

    const clearSelection = () => {
        setSelectedOptions(null);
    }

    function select_year(e) {
        SetSearchTerm_year(e)
        SetSearchTerm_year_1(e.value)
    }

    // Update Dataoptions based on SearchTerm_year_1 using useEffect
    useEffect(() => {
        if (SearchTerm_year_1 === "2026") {
            setDataoptions(optionList);
        
        } else {
            setDataoptions([]); // Clear options if year is not 2024 or 2025
        }
    }, [SearchTerm_year_1]); // Only re-run effect when SearchTerm_year_1 changes

    return (
        <div className="app">

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <div style={{ width: '56%' }}>
                    <FormControl sx={{ minWidth: 10 }} size="large">
                        <Select
                            options={optionList_year}
                            placeholder="select Year"
                            value={SearchTerm_year}
                            onChange={select_year}
                            isSearchable={true}
                        />
                    </FormControl>
                </div>
                <div className="dropdown-container" style={{ width: '100%' }}>
                    <Select
                        options={Dataoptions}
                        placeholder="what you have read today"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable={true}

                    />
                    {selectedOptions && (
                        <Button
                            onClick={clearSelection}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, bgcolor: '#660066',
                                width: 100, fontSize: 12,
                                '&:hover': {
                                    bgcolor: '#660066',
                                },
                            }}
                        >
                            Clear Selection
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}