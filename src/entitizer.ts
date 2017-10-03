
import { PlainObject } from './utils';
import { EntityRepository, UniqueNameRepository, UniqueNameHelper, Entity } from 'entitizer.entities';
import { Repository as ExtractorRepository, extract as extractEntities, Concept } from 'entitizer.entities-extractor';

class ExtractorRepositoryImpl implements ExtractorRepository<Entity> {
    constructor(private entityRepository: EntityRepository, private uniqueNameRepository: UniqueNameRepository) { }

    entitiesByIds(ids: string[]): Promise<Entity[]> {
        return this.entityRepository.getByIds(ids).toPromise();
    }
    entityIdsByKeys(keys: string[]): Promise<PlainObject<string[]>> {
        return this.uniqueNameRepository.getEntityIdsByKeys(keys).toPromise();
    }
}

function formatKey(name: string, lang: string): string {
    return UniqueNameHelper.formatKey({
        uniqueName: UniqueNameHelper.formatUniqueName(name, lang),
        lang
    });
}

export class Entitizer {
    private extractorRep: ExtractorRepositoryImpl;
    constructor(private entityRepository: EntityRepository, private uniqueNameRepository: UniqueNameRepository) {
        this.extractorRep = new ExtractorRepositoryImpl(entityRepository, uniqueNameRepository);
    }

    entitize(context: Context): Promise<EntitizeResult> {
        return extractEntities(context, this.extractorRep, formatKey);
    }
}

export type EntitizeResult = {
    concepts: Concept[],
    entities: { entity: Entity, concepts: Concept[] }[]
}

export type Context = {
    lang: string
    text: string
    country?: string
}
