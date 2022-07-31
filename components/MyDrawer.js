/* eslint-disable @next/next/no-img-element */
import Drawer from 'react-modern-drawer'
import { BackButton } from './BackButton'
import CheckIcon from './CheckIcon'
import { useMobile } from '../utils/responsive'
import styles from '../styles/Drawer.module.scss'

const Heading = ({ children, className = '', style = {} }) => {
  return (
    <h2
      className={`px-2 border-b is-uppercase ${className}`}
      style={{
        fontWeight: 700,
        letterSpacing: '2px',
        fontSize: '0.82rem',
        ...style
      }}>
      {children}
    </h2>
  )
}


const SplitPane = ({ left, children, right, onClick }) => {
  return (
    <div
      className={`is-flex is-align-content-center border-b mx-0 py-3 px-2 ${styles.splitPane}`}
      onClick={onClick}>
      {left}
      <div className="is-inline is-flex-grow-1 my-auto">
        {children}
      </div>
      {right}
    </div>
  )
}


const IconSplitPane = ({ children, onClick, imgSrc, active }) => {
  return (
    <SplitPane
      left={
        imgSrc ? <img
          alt=""
          width="13px"
          src={imgSrc} /> : null
      }
      right={
        <CheckIcon
          outline={true}
          active={active} />
      }
      onClick={onClick}>
      {children}
    </SplitPane>
  )
}


const MyDrawer = ({
  children,
  title = '',
  open = false,
  onClose = () => { }
}) => {
  const isMobile = useMobile()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="left"
      style={{ cursor: 'auto' }}
      size={isMobile ? '235px' : '265px'}
      duration={300}
      className="drawer">
      <div className="is-flex is-align-content-center px-2 py-2 mb-0 border-b">
        <BackButton onClick={onClose} />
        <p
          style={{ fontSize: '1.12rem' }}
          className="ml-1 my-auto">
          {title}
        </p>
      </div>

      {children}
    </Drawer>
  )
}


export default Object.assign(MyDrawer, {
  Heading,
  SplitPane,
  IconSplitPane
})