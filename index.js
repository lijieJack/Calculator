class Computer{
  plus(a, b){
    return a + b;
  }
  minus(a, b){
    return a - b;
  }
  mul(a, b){
    return a * b;
  }
  div(a, b){
    return a / b;
  }
}

class Calculator extends Computer{
  constructor(doc){
    super();
    const oCal = doc.getElementsByClassName('calculator')[0];
    this.fInput = oCal.getElementsByTagName('input')[0]
    this.sInput = oCal.getElementsByTagName('input')[1]

    this.oBtnGroup = oCal.getElementsByClassName('btn-group')[0];
    this.oBtns = this.oBtnGroup.getElementsByTagName('button');


    this.oResult = oCal.getElementsByClassName('result')[0];

    // this.data = {
    //   // fNumber: xxx,
    //   // sNumber: xxx,
    //   // field: 'plus'
    // };

    this.data = this.defineData();


    this.btnIdx = 0;

    this.init();
  }

  init(){
    this.bindEvent();

  }

  bindEvent(){
    this.oBtnGroup.addEventListener('click', this.onFieldBtnClick.bind(this), false);
    this.fInput.addEventListener('input', this.onInputAction.bind(this), false);
    this.sInput.addEventListener('input', this.onInputAction.bind(this), false);

  }
  onInputAction(ev){
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          className = tar.className,
          number = Number(tar.value.replace(/\s+/g, '')) || 0;
    switch (className) {
      case 'f-input':
        this.data.fNumber =  number;       
        break;
      case 's-input':
        this.data.sNumber =  number;    
        break;
      default:
        break;
    }
  }

  onFieldBtnClick(ev){
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          tagName = tar.tagName.toLowerCase();
          tagName === 'button' && this.fieldUpdate(tar);


  }
  fieldUpdate(target){
    this.oBtns[this.btnIdx].className = '';
    this.btnIdx = [].indexOf.call(this.oBtns, target);
    target.className = ' current';
    this.data.field = target.getAttribute('data-field');

  }

  defineData(){
    let _obj = {},
      fNumber = 0,
      sNumber = 0,
      field = 'plus';
    const _self = this;
    
    Object.defineProperties(_obj, {
      fNumber:{
        
        get(){
          console.log('getting fNumber', fNumber);
          return fNumber;
        },

        set(newVal){
          fNumber = newVal;
          _self.calculatorResult(fNumber, sNumber, field)
          console.log('seting  fNumber', fNumber);
        }
      },
      sNumber:{
        
        get(){
          console.log('getting sNumber', sNumber);
          return sNumber;
        },

        set(newVal){
          sNumber = newVal;
          _self.calculatorResult(fNumber, sNumber, field)
          console.log('seting  sNumber', sNumber);
        }
      },
      field:{
        
        get(){
          console.log('getting field', field);
          return field;
        },

        set(newVal){
          field = newVal;
          _self.calculatorResult(fNumber, sNumber, field)
          console.log('seting  field', field);
        }

      }
    })

    return _obj;
  }

  calculatorResult(fNumber, sNumber, field){
    console.log('进行一次计算');
    this.oResult.innerText = this[field](fNumber, sNumber);
  }

}

const $html = document.querySelector('body');
const calculator = new Calculator($html)