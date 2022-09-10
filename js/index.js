const paths = document.querySelectorAll('path')
const wrap = document.querySelector('.diamond-wrap')

wrap.style.paddingTop = '50' + 'px'

for (let i = 0; i < paths.length; i++) {
    paths[i].style.strokeDasharray = `${Math.ceil(paths[i].getTotalLength())}` + 'px'
    paths[i].style.strokeDashoffset = `${Math.ceil(paths[i].getTotalLength())}` + 'px'

    // console.log(`length ${i} is ${Math.ceil(paths[i].getTotalLength())}`)
    
}