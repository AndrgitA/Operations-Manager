export default {
    props: {
        maxLength: {
            type: Number,
            default: null
        }
    },
    data(){
        return {
            counter: 0
        }
    },
    computed: {
        hasMaxlength(){
            return (this.maxLength || 0) > 0;
        },
        differenceCounter() {
            return this.hasMaxlength ? this.counter / this.maxLength : false;
        },
        limitClasses(){
            let dif = this.differenceCounter;
            if (dif !== false) {
                return {
                    'error': dif <= 0.5,
                    'warning': dif > 0.5 && dif <= 0.8
                }
            }
            return '';
        }
    },
    methods: {
        updateCounter(newValue){
            if (this.hasMaxlength) {
                this.counter = this.maxLength - newValue.toString().length;
            }
        }
    }
}