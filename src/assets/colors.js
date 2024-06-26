export const  colorsSet = [
    {letter: '#880E4F', back:'#FCE4EC'},
    {letter: '#4A148C', back:'#F3E5F5'},
    {letter: '#311B92', back:'#EDE7F6'},
    {letter: '#1A237E', back:'#E8EAF6'},
    {letter: '#0D47A1', back:'#E3F2FD'},
    {letter: '#01579B', back:'#E1F5FE'},
    {letter: '#006064', back:'#E0F7FA'},
    {letter: '#004D40', back:'#E0F2F1'},
    {letter: '#1B5E20', back:'#E8F5E9'},
    {letter: '#33691E', back:'#F1F8E9'},
    {letter: '#827717', back:'#F9FBE7'},
    {letter: '#F57F17', back:'#FFFDE7'},
    {letter: '#263238', back:'#ECEFF1'},
    {letter: '#880E4F', back:'#FCE4EC'},
    {letter: '#4A148C', back:'#F3E5F5'},
    {letter: '#311B92', back:'#EDE7F6'},
    {letter: '#1A237E', back:'#E8EAF6'},
    {letter: '#0D47A1', back:'#E3F2FD'},
    {letter: '#01579B', back:'#E1F5FE'},
    {letter: '#006064', back:'#E0F7FA'},
    {letter: '#004D40', back:'#E0F2F1'},
    {letter: '#1B5E20', back:'#E8F5E9'},
    {letter: '#33691E', back:'#F1F8E9'},
    {letter: '#827717', back:'#F9FBE7'},
    {letter: '#F57F17', back:'#FFFDE7'},
    {letter: '#263238', back:'#ECEFF1'},
  
  ]

export const getColor = () => {
   return colorsSet[randomNumberInRange(0,25)]
}
const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;