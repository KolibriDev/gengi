import React from 'react'
import app from './app/index'
import { startClient } from 'react-chain'

startClient(app, document.getElementById('app'))
