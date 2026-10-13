class ProgressRing {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.wrapper = element;
        this.svg = this.wrapper.querySelector('svg');
        this.circle = this.wrapper.querySelector('.progress-ring_circle');
        this.bgCircle = this.wrapper.querySelector('.progress-ring_bg');
        
        this.initDimensions();
        
        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = this.circumference;
    }

    initDimensions() {
        const size = this.svg.clientWidth || parseInt(this.svg.getAttribute('width'), 10) || 120;
        const center = size / 2;
        
        const strokeWidth = parseFloat(getComputedStyle(this.circle).strokeWidth) || 8;
        
        this.radius = center - strokeWidth;
        this.circumference = 2 * Math.PI * this.radius;
        
        [this.circle, this.bgCircle].forEach(c => {
            c.setAttribute('cx', center);
            c.setAttribute('cy', center);
            c.setAttribute('r', this.radius);
        });
    }

    /**
     * @param {number} percent 
     */
    setProgress(percent) {
        const value = Math.max(0, Math.min(100, percent));
        const offset = this.circumference - (value / 100) * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }

    /**
     * @param {boolean} isAnimated 
     */
    setAnimated(isAnimated) {
        if (isAnimated) {
            this.wrapper.classList.add('is-animated');
        } else {
            this.wrapper.classList.remove('is-animated');
        }
    }

    /**
     * @param {boolean} isHidden 
     */
    setHidden(isHidden) {
        if (isHidden) {
            this.wrapper.classList.add('is-hidden');
        } else {
            this.wrapper.classList.remove('is-hidden');
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const wrapperNode = document.querySelector('.progress-wrapper');
    
    const progressBlock = new ProgressRing(wrapperNode);

    const valueInput = document.getElementById('value-input');
    const animateToggle = document.getElementById('animate-toggle');
    const hideToggle = document.getElementById('hide-toggle');

    progressBlock.setProgress(valueInput.value);
    progressBlock.setAnimated(animateToggle.checked);
    progressBlock.setHidden(hideToggle.checked);

    valueInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 0;
        progressBlock.setProgress(val);
    });

    valueInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 0;
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        e.target.value = val;
    });

    animateToggle.addEventListener('change', (e) => {
        progressBlock.setAnimated(e.target.checked);
    });

    hideToggle.addEventListener('change', (e) => {
        progressBlock.setHidden(e.target.checked);
    });
});