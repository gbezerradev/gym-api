import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gym'
import { Prisma } from '@prisma/client'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search gyms by query', async () => {
    for (let i = 1; i <= 5; i++) {
      await gymsRepository.create({
        name: `Gym ${i}`,
        latitude: new Prisma.Decimal(0),
        longitude: new Prisma.Decimal(0),
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(5)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Gym 1',
        }),
        expect.objectContaining({
          name: 'Gym 2',
        }),
        expect.objectContaining({
          name: 'Gym 3',
        }),
        expect.objectContaining({
          name: 'Gym 4',
        }),
        expect.objectContaining({
          name: 'Gym 5',
        }),
      ]),
    )
  })

  it('should be able to paginate gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Gym ${i}`,
        latitude: new Prisma.Decimal(0),
        longitude: new Prisma.Decimal(0),
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Gym 21',
        }),
        expect.objectContaining({
          name: 'Gym 22',
        }),
      ]),
    )
  })
})
