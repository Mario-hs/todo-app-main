const lightTheme = document.querySelector('#light').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('dark')
    document.querySelector('#theme').classList.add('light')
})

const darkTheme = document.querySelector('#dark').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('light')
    document.querySelector('#theme').classList.add('dark')
})