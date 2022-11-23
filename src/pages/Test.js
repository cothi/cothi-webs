import { useContext, useEffect } from 'react'
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
    let canvas = document.querySelector('canvas')
    useEffect(() => {
        if (canvas) {
            let context = canvas.getContext('2d')

            let lineObj = {
                time: 0,
                velocity: 0.1,
                velocityTarget: 0.1,
                width: 0,
                height: 0,
                lastX: 0,
                lastY: 0,
            }
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
                lineObj.velocity += lineObj.velocityTarget
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
        }
    }, [canvas])
    return (
        <Wrapper>
            <CanvasMain></CanvasMain>
            <CanvasSpan>drag to rotate</CanvasSpan>
        </Wrapper>
    )
}
export default Test
