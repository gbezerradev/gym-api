import { it, expect, describe, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      name: 'Academia do Zé',
      description: 'A melhor academia da cidade',
      phone: '123456789',
      latitude: 123.123,
      longitude: 321.321,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
