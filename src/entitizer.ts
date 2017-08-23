
import { PlainObject } from './utils';
import { EntityRepository, UniqueNameRepository, UniqueNameHelper } from 'entitizer.entities';
import { Repository as ExtractorRepository, Entity as ExtractorEntity, ConceptData, extract as extractEntities } from 'entitizer.entities-extractor';

class ExtractorRepositoryImpl implements ExtractorRepository {
    constructor(private entityRepository: EntityRepository, private uniqueNameRepository: UniqueNameRepository) { }

    entitiesByIds(ids: string[]): Promise<ExtractorEntity[]> {
        return this.entityRepository.getByIds(ids).map(list => list.map(item => <ExtractorEntity>item)).toPromise();
    }
    entityIdsByKeys(keys: string[]): Promise<PlainObject<string[]>> {
        return this.uniqueNameRepository.getEntityIdsByKeys(keys).toPromise();
    }
}

function formatKey(name: string, lang: string): string {
    return UniqueNameHelper.formatKey({
        uniqueName: UniqueNameHelper.formatUniqueName(name),
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
    concepts: ConceptData[],
    entities: ExtractorEntity[]
}

export type Context = {
    lang: string
    text: string
    country?: string
}
