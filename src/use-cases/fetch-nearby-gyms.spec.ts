import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Prisma } from '@prisma/client'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Gym 1',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
    })

    await gymsRepository.create({
      name: 'Gym 2',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
    })

    await gymsRepository.create({
      name: 'Gym 3',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
    })

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(gyms).toHaveLength(3)
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
      ]),
    )
  })

  it('should be able to fetch nearby gyms within a 10km radius', async () => {
    await gymsRepository.create({
      name: 'Gym 1',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
    })

    await gymsRepository.create({
      name: 'Gym 2',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0.1),
    })

    await gymsRepository.create({
      name: 'Gym 3',
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0.2),
    })

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Gym 1',
        }),
      ]),
    )
  })
})
