import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { Box, Drawer } from '@mui/material'
import { FullPageChat } from 'aai-embed-react'
import generateThemeColors from '@/utils/generateThemeColors'
import { useHelpChatContext } from './HelpChatContext' // Import the context
import Avatar from '@mui/material/Avatar'
import Close from '@mui/icons-material/Close'
import ChatIcon from '@mui/icons-material/ContactSupport'
import Resize from '@mui/icons-material/Height'

// const drawerWidth = 350

const HelpChatDrawer = ({ apiHost, chatflowid }) => {
    const theme = useTheme()

    const { helpChatOpen, setHelpChatOpen } = useHelpChatContext()

    const [drawerWidth, setDrawerWidth] = React.useState(350)

    const transitionDefault = '.3s ease-in-out'

    const [transition, setTransition] = React.useState(transitionDefault)

    const handleMouseDown = (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        setTransition('')
    }

    const handleMouseMove = (e) => {
        setDrawerWidth(window.innerWidth - e.clientX) // adjust based on mouse X position
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setTransition(transitionDefault)
    }

    // Update theme color here
    const baseColor = '#000000' //theme.palette.primary.light
    const themeColors = generateThemeColors(baseColor)

    const toggleChat = () => {
        setHelpChatOpen(!helpChatOpen)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                maxWidth: helpChatOpen ? `${drawerWidth}px` : '0px',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    transition,
                    transform: 'translateX(-100%)',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Avatar
                    variant='rounded'
                    onClick={toggleChat}
                    sx={{
                        // Uncomment to hide the open icon and only show the close
                        // display: helpChatOpen ? 'flex' : 'none',

                        color: themeColors.chatWindowPoweredByTextColor,
                        backgroundColor: themeColors.chatWindowBackgroundColor,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,

                        '&:hover': {
                            color: theme.palette.primary.light
                        }
                    }}
                >
                    {helpChatOpen ? (
                        <Close stroke={themeColors.chatWindowPoweredByTextColor} sx={{ fontSize: '1rem' }} />
                    ) : (
                        <ChatIcon stroke={themeColors.chatWindowPoweredByTextColor} sx={{ fontSize: '2rem' }} />
                    )}
                </Avatar>
                <Avatar
                    variant='rounded'
                    onMouseDown={handleMouseDown}
                    sx={{
                        color: themeColors.chatWindowPoweredByTextColor,
                        backgroundColor: themeColors.chatWindowBackgroundColor,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        transform: 'rotate(90deg)',
                        visibility: helpChatOpen ? 'visible' : 'hidden',

                        '&:hover': {
                            color: theme.palette.primary.light
                        }
                    }}
                >
                    <Resize stroke={themeColors.chatWindowPoweredByTextColor} sx={{ fontSize: '1rem' }} />
                </Avatar>
            </Box>

            <Drawer
                className={helpChatOpen ? 'MuiDrawer-open' : 'MuiDrawer-closed'}
                anchor='right'
                open={helpChatOpen}
                variant='permanent'
                sx={{
                    height: '100vh',
                    width: helpChatOpen ? drawerWidth : 0,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    transition,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    backgroundColor: '#000000',
                    padding: 0,
                    border: 'none',

                    ' .MuiDrawer-paper': {
                        backgroundColor: '#000000',
                        padding: 0,
                        border: 'none',
                        transition,
                        overflowY: 'hidden',
                        width: helpChatOpen ? drawerWidth : 0
                    }
                }}
            >
                <Box sx={{ maxWidth: drawerWidth, textWrap: 'initial' }}>
                    <FullPageChat
                        apiHost={apiHost}
                        chatflowid={chatflowid}
                        // observersConfig={{
                        //     //   observeUserInput: (userInput: string) => {
                        //     //     // console.log("User input observed:", userInput);
                        //     //   },
                        //     //xw   observeLoading: (loading: boolean) => {
                        //     //     // console.log("Loading state observed:", loading);
                        //     //   },
                        //     observeMessages: (messages) => {
                        //         console.log('Messages observed again:', messages)
                        //     },
                        //     observeStreamEnd: (messages) => {
                        //         console.log('Stream End:', messages)
                        //     }
                        // }}
                        theme={{
                            button: {
                                size: 'small',
                                backgroundColor: themeColors.buttonBackgroundColor,
                                iconColor: themeColors.buttonIconColor,
                                // customIconSrc: 'https://example.com/icon.png',
                                bottom: 10,
                                right: 10
                            },
                            chatWindow: {
                                showTitle: true,
                                // title: 'Help Chatbot',
                                // titleAvatarSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
                                backgroundColor: themeColors.chatWindowBackgroundColor,
                                width: -1,
                                fontSize: 12,
                                botMessage: {
                                    backgroundColor: themeColors.botMessageBackgroundColor,
                                    textColor: themeColors.botMessageTextColor,
                                    showAvatar: true,
                                    avatarSrc: '/static/images/logos/answerai-logo.png'
                                },
                                userMessage: {
                                    backgroundColor: themeColors.userMessageBackgroundColor,
                                    textColor: themeColors.userMessageTextColor,
                                    showAvatar: false,
                                    avatarSrc:
                                        'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
                                },
                                textInput: {
                                    // placeholder: 'Type your message...',
                                    backgroundColor: themeColors.textInputBackgroundColor,
                                    textColor: themeColors.textInputTextColor,
                                    sendButtonColor: themeColors.textInputSendButtonColor,
                                    autoFocus: true
                                    // sendMessageSound: true,
                                    // receiveMessageSound: true
                                },
                                feedback: {
                                    color: themeColors.feedbackColor
                                },
                                footer: {
                                    textColor: themeColors.footerTextColor
                                    // text: 'Powered by',
                                    // company: 'The AnswerAI',
                                    // companyLink: 'https://theanswer.ai'
                                }
                            }
                        }}
                    />
                </Box>
            </Drawer>
        </Box>
    )
}

HelpChatDrawer.propTypes = {
    apiHost: PropTypes.string.isRequired,
    chatflowid: PropTypes.string.isRequired
}

export default HelpChatDrawer
