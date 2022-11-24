import React, { useContext, useEffect } from 'react'
import { AppContext } from '../index.js'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    background-color: #111;
`
const CanvasSpan = styled.span`
    color: #777;
    position: absolute;
    top: 20px;
    left: 20px;
    user-select: none;
`

const CanvasMain = styled.canvas`
    margin: auto;
`

const Test = () => {
    const ref = React.useRef(null)
    useEffect(() => {
        let canvas = ref.current.querySelector('canvas')
        console.log('canvas', canvas)
        let lineObj = {
            time: 0,
            velocity: 0.1,
            velocityTarget: 0.1,
            width: 0,
            height: 0,
            lastX: 0,
            lastY: 0,
        }
        let context = canvas.getContext('2d')

        let MAX_OFFSET = 400
        let SPACING = 6
        let POINTS = MAX_OFFSET / SPACING
        let PEAK = MAX_OFFSET * 0.25
        let POINTS_PER_LAP = 6
        let SHADOW_STRENGTH = 6

        setup()
        function setup() {
            resize()
            step()

            window.addEventListener('resize', resize)
            window.addEventListener('mousedown', onMouseDown)
            window.addEventListener('touchstart', onTouchStart)

            //window.addEventListener('resize', resize)
        }

        function clear() {
            context.clearRect(0, 0, lineObj.width, lineObj.height)
        }

        function resize() {
            lineObj.width = canvas.width = window.innerWidth
            lineObj.height = canvas.height = window.innerHeight
        }
        function step() {
            lineObj.time += lineObj.velocity
            //console.log('[time]', lineObj.time)
            lineObj.velocity +=
                (lineObj.velocityTarget - lineObj.velocity) * 0.3
            clear()
            render()

            requestAnimationFrame(step)
        }

        function render() {
            let x = 0,
                y,
                cx = lineObj.width / 2,
                cy = lineObj.height / 2

            context.globalCompositeOperation = 'lighter'
            context.strokeStyle = '#fff'
            context.shadowColor = '#fff'
            context.lineWidth = 2
            context.beginPath()

            let angle = 0

            for (let i = POINTS; i > 0; i--) {
                angle = i * SPACING + (lineObj.time % SPACING)
                x = Math.sin(angle / 6) * Math.PI
                y = Math.cos(angle / 6) * Math.PI

                x = x * angle
                y = y * angle * 0.35

                context.globalAlpha = 1 - angle / MAX_OFFSET
                //context.shadowBlur = SHADOW_STRENGTH * 10

                context.lineTo(cx + x, cy + y)
                context.stroke()
                context.beginPath()
                context.moveTo(cx + x, cy + y)
            }
            context.lineTo(cx, cy - 200)
            context.stroke()
        }
        function onMouseDown(event) {
            lineObj.lastX = event.clientX
            lineObj.lastY = event.clientY
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }

        function onMouseMove(event) {
            let vx = (event.clientX - lineObj.lastX) / 100
            let vy = (event.clientY - lineObj.lastY) / 100

            if (event.clientY > lineObj.height / 2) vx *= -1
            if (event.clientX > lineObj.width / 2) vy *= -1

            lineObj.velocityTarget = vx + vy

            lineObj.lastX = event.clientX
            lineObj.lastY = event.clientY
        }

        function onMouseUp(event) {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        function onTouchStart(event) {
            event.preventDefault()

            lineObj.lastX = event.touches[0].clientX
            lineObj.lastY = event.touches[0].clientY
            document.addEventListener('touchmove', onTouchMove)
            document.addEventListener('touchend', onTouchEnd)
        }

        function onTouchMove(event) {
            let vx = (event.touches[0].clientX - lineObj.lastX) / 100
            let vy = (event.touches[0].clientY - lineObj.lastY) / 100

            if (event.touches[0].clientY < lineObj.height / 2) vx *= -1
            if (event.touches[0].clientX > lineObj.width / 2) vy *= -1

            lineObj.velocityTarget = vx + vy

            lineObj.lastX = event.touches[0].clientX
            lineObj.lastY = event.touches[0].clientY
        }

        function onTouchEnd(event) {
            document.removeEventListener('touchmove', onTouchMove)
            document.removeEventListener('touchend', onTouchEnd)
        }
    }, [])
    return (
        <Wrapper ref={ref}>
            <CanvasMain></CanvasMain>
            <CanvasSpan>drag to rotate</CanvasSpan>
        </Wrapper>
    )
}
export default Test
