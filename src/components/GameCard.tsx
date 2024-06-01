import React from 'react'
import { Game } from '../hooks/usegames'
import { Card, CardBody, Heading, Image} from '@chakra-ui/react'


interface Props {
    game: Game
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
        <Image src={game.background_image}/>
        <CardBody>
            <Heading>{game.name}</Heading>
        </CardBody>
    </Card>
  )
}

export default GameCard