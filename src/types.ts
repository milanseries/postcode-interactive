import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  verifyLocation: VerifyLocationPayload;
};


export type MutationVerifyLocationArgs = {
  input: VerifyLocationInput;
};

export type Query = {
  __typename?: 'Query';
  searchLocations: SearchLocationsPayload;
};


export type QuerySearchLocationsArgs = {
  input: SearchLocationInput;
};

export type SearchLocationInput = {
  query: Scalars['String']['input'];
};

export type SearchLocationResult = {
  __typename?: 'SearchLocationResult';
  category?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SearchLocationsPayload = {
  __typename?: 'SearchLocationsPayload';
  data?: Maybe<Array<Maybe<SearchLocationResult>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type VerifiedLocation = {
  __typename?: 'VerifiedLocation';
  postcode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  suburb?: Maybe<Scalars['String']['output']>;
};

export type VerifyLocationError = {
  __typename?: 'VerifyLocationError';
  message?: Maybe<Scalars['String']['output']>;
};

export type VerifyLocationInput = {
  postcode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  suburb: Scalars['String']['input'];
};

export type VerifyLocationPayload = {
  __typename?: 'VerifyLocationPayload';
  data?: Maybe<VerifiedLocation>;
  error?: Maybe<VerifyLocationError>;
  message?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SearchLocationInput: SearchLocationInput;
  SearchLocationResult: ResolverTypeWrapper<SearchLocationResult>;
  SearchLocationsPayload: ResolverTypeWrapper<SearchLocationsPayload>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  VerifiedLocation: ResolverTypeWrapper<VerifiedLocation>;
  VerifyLocationError: ResolverTypeWrapper<VerifyLocationError>;
  VerifyLocationInput: VerifyLocationInput;
  VerifyLocationPayload: ResolverTypeWrapper<VerifyLocationPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SearchLocationInput: SearchLocationInput;
  SearchLocationResult: SearchLocationResult;
  SearchLocationsPayload: SearchLocationsPayload;
  String: Scalars['String']['output'];
  VerifiedLocation: VerifiedLocation;
  VerifyLocationError: VerifyLocationError;
  VerifyLocationInput: VerifyLocationInput;
  VerifyLocationPayload: VerifyLocationPayload;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  verifyLocation?: Resolver<ResolversTypes['VerifyLocationPayload'], ParentType, ContextType, RequireFields<MutationVerifyLocationArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  searchLocations?: Resolver<ResolversTypes['SearchLocationsPayload'], ParentType, ContextType, RequireFields<QuerySearchLocationsArgs, 'input'>>;
};

export type SearchLocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchLocationResult'] = ResolversParentTypes['SearchLocationResult']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  postcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchLocationsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchLocationsPayload'] = ResolversParentTypes['SearchLocationsPayload']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchLocationResult']>>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifiedLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifiedLocation'] = ResolversParentTypes['VerifiedLocation']> = {
  postcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suburb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyLocationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyLocationError'] = ResolversParentTypes['VerifyLocationError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyLocationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyLocationPayload'] = ResolversParentTypes['VerifyLocationPayload']> = {
  data?: Resolver<Maybe<ResolversTypes['VerifiedLocation']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['VerifyLocationError']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchLocationResult?: SearchLocationResultResolvers<ContextType>;
  SearchLocationsPayload?: SearchLocationsPayloadResolvers<ContextType>;
  VerifiedLocation?: VerifiedLocationResolvers<ContextType>;
  VerifyLocationError?: VerifyLocationErrorResolvers<ContextType>;
  VerifyLocationPayload?: VerifyLocationPayloadResolvers<ContextType>;
};


export type VerifyLocationMutationVariables = Exact<{
  input: VerifyLocationInput;
}>;


export type VerifyLocationMutation = { __typename?: 'Mutation', verifyLocation: { __typename?: 'VerifyLocationPayload', message?: string | null, data?: { __typename?: 'VerifiedLocation', postcode?: string | null, suburb?: string | null, state?: string | null } | null, error?: { __typename?: 'VerifyLocationError', message?: string | null } | null } };

export type SearchLocationsQueryVariables = Exact<{
  input: SearchLocationInput;
}>;


export type SearchLocationsQuery = { __typename?: 'Query', searchLocations: { __typename?: 'SearchLocationsPayload', message?: string | null, data?: Array<{ __typename?: 'SearchLocationResult', category?: string | null, id?: number | null, latitude?: number | null, location?: string | null, longitude?: number | null, postcode?: string | null, state?: string | null } | null> | null } };
