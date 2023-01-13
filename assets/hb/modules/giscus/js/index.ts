import Giscus from 'giscus/js'
(() => {
    'use strict'

    const giscus = new Giscus()

    const setTheme = (theme) => {
        giscus.setTheme(theme)
    }

    const getPreferredTheme = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('giscus-load', () => {
            // change the theme after loading the giscus frame.
            const frame = document.querySelector('iframe.giscus-frame.giscus-frame--loading')
            frame?.addEventListener('load', () => {
                const theme = localStorage.getItem('hb-theme')
                setTheme(theme === 'auto' ? getPreferredTheme() : theme)
            })
        })

        document.addEventListener('hb:theme', ((e: CustomEvent) => {
            setTheme(e.detail.theme)
        }) as EventListener)
    })
})()
